using NICE.Identity.Management.Models;

namespace NICE.Identity.Management.Services
{
	public interface IAuditService
	{
		int WriteAuditEntry(Audit auditEntry);
	}

	public class AuditService : IAuditService
	{
		private readonly IdentityContext _context;

		public AuditService(IdentityContext context)
		{
			_context = context;
		}

		public int WriteAuditEntry(Audit auditEntry)
		{
			_context.Audit.Add(auditEntry);
			return _context.SaveChanges();
		}
	}
}
