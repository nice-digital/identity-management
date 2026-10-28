FROM mcr.microsoft.com/dotnet/aspnet:10.0.7-resolute-amd64

RUN  apt-get update \
  && apt-get install -y wget
  
WORKDIR /app

# Copy published backend
COPY ./published-app ./

# App listens on port 80
ENV ASPNETCORE_URLS=http://0.0.0.0:80

EXPOSE 80

ENTRYPOINT ["dotnet", "NICE.Identity.Management.dll"]