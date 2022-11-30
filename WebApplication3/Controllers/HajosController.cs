using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HajosController : ControllerBase
    {
        Models.HajosContext hajosdb = new Models.HajosContext();

        [HttpGet]
        [Route("questions/all")]
        public IActionResult r1()
        {
            var kérdések = from x in hajosdb.Questions select x.Question1;

            return new JsonResult(kérdések);
        }


    }
}
