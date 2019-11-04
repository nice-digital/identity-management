using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NICE.Identity.Management.Configuration;
using NICE.Logging;
using NICE.Logging.Sinks.RabbitMQ;
using Serilog;
using Serilog.Events;

namespace NICE.Identity.Management
{
    public interface ISeriLogger {
        void Configure(ILoggerFactory loggerFactory, IConfiguration configuration, IApplicationLifetime appLifetime, IHostingEnvironment env);
    }

    public class SeriLogger : ISeriLogger
    {
        public void Configure(ILoggerFactory loggerFactory, IConfiguration configuration, IApplicationLifetime appLifetime, IHostingEnvironment env)
        {
            // Read Logging configuration
            var logCfg = configuration.GetSection("Logging");

            loggerFactory.AddConsole(logCfg); // add provider to send logs to System.Console.WriteLine()
            loggerFactory.AddDebug(); // add provider to send logs to System.Diagnostics.Debug.WriteLine()

            var application = logCfg["Application"];
            var environment = logCfg["Environment"];
            var rabbitMQHost = logCfg["RabbitMQHost"];
            var rabbitMQVHost = logCfg["RabbitMQVHost"];
            var rabbitPortIsSet = int.TryParse(logCfg["RabbitMQPort"], out var rabbitMQPort);
            var rabbitMQUsername = logCfg["RabbitMQUsername"];
            var rabbitMQPassword = logCfg["RabbitMQPassword"];
            var rabbitMQExchangeName = logCfg["RabbitMQExchangeName"];
            var rabbitMQExchangeType = logCfg["RabbitMQExchangeType"];
            var serilogFilePath = logCfg["SerilogFilePath"];
            Enum.TryParse(logCfg["SerilogMinLevel"], out LogEventLevel serilogMinLevel);
            bool.TryParse(logCfg["UseRabbit"], out var useRabbit);
            bool.TryParse(logCfg["UseFile"], out var useFile);

            var serilogFormatter = new NiceSerilogFormatter(environment, application);
            var serilogConfiguration = new LoggerConfiguration().MinimumLevel.Is(serilogMinLevel);

            if (useRabbit && !string.IsNullOrEmpty(rabbitMQHost) && rabbitPortIsSet)
            {
                var rabbitCfg = new RabbitMQConfiguration {
                    Hostname = rabbitMQHost,
                    VHost = rabbitMQVHost,
                    Port = rabbitMQPort,
                    Username = rabbitMQUsername,
                    Password = rabbitMQPassword,
                    Protocol = RabbitMQ.Client.Protocols.AMQP_0_9_1,
                    Exchange = rabbitMQExchangeName,
                    ExchangeType = rabbitMQExchangeType
                };

                // Write logs to RabbitMQ / Kibana
                serilogConfiguration.WriteTo.RabbitMQ(rabbitCfg, serilogFormatter);
            }

            // Write logs to file
            if (useFile)
            {
                serilogConfiguration.WriteTo.RollingFile(serilogFormatter, 
                    serilogFilePath, 
                    fileSizeLimitBytes: 5000000, 
                    retainedFileCountLimit: 5, 
                    flushToDiskInterval: TimeSpan.FromSeconds(20));
            }

            try
            {
                // Create Logger
                Log.Logger = serilogConfiguration.CreateLogger();
                // Add Serilog provider
                loggerFactory.AddSerilog();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                Log.Logger = new LoggerConfiguration().MinimumLevel.Warning()
                    .WriteTo.RollingFile(serilogFormatter, serilogFilePath, fileSizeLimitBytes: 5000000)
                    .CreateLogger();
                loggerFactory.AddSerilog();
                var logger = loggerFactory.CreateLogger<SeriLogger>();
                logger.LogError("Could not connect to RabbitMQ:" +
                                $"Hostname:{rabbitMQHost} " +
                                $"Port:{rabbitMQPort.ToString()}, " +
                                $"Username:{rabbitMQUsername}, " +
                                $"Exchange:{rabbitMQExchangeName}, " +
                                $"ExchangeType:{rabbitMQExchangeType}, " +
                                $"Exception: {exception.Message}");
                throw;
            }

            // Clean up on shutdown
            appLifetime.ApplicationStopped.Register(Log.CloseAndFlush);
        }
    }
}
