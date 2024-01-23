using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System.Data;

namespace webapi
{
    public class ChatHub : Hub
    {
        private readonly ILogger<ChatHub> _logger;

        public ChatHub(ILogger<ChatHub> logger)
        {
            this._logger = logger;
        }

        //for optix send alarm message ,and temperature
        public async Task SendMessage(string user, string location, string message)
        {
            switch (location)
            {
                case "Alarm":
                    await Clients.Others.SendAsync("AlarmMessageOnWeb", user, message);
                    _logger.LogInformation($"AlarmMessageOnWeb to client {user}\t{message}");
                    break;
                case "CW":
                    await Clients.Others.SendAsync("CWTemperatureOnWeb", user, message);
                    _logger.LogInformation($"CWTemperatureOnWeb to client {user}\t{message}");
                    break;
                case "HW":
                    await Clients.Others.SendAsync("HWTemperatureOnWeb", user, message);
                    _logger.LogInformation($"HWTemperatureOnWeb to client {user}\t{message}");
                    break;
                default:
                    await Clients.Others.SendAsync("ReceiveMessage", location, message);
                    _logger.LogInformation($"ReceiveMessage to client {user}\t{message}");
                    break;
            }

        }
        //for optix running
        public async Task PumpsChangeStatus(string user, string name, string status)
        {
            await Clients.Others.SendAsync("PumpsStatusChangeOnWeb", user, name, status);
            _logger.LogInformation($"PumpsStatusChangeOnWeb to client {user}\t{name}:{status}");
        }
        // for 3D web browser,and Client should only send to Optix Client,need test
        public async Task PumpClicked(string user, string message)
        {
            await Clients.Others.SendAsync("PumpClickedOnOptix", user, message);
            _logger.LogInformation($"PumpClickedOnOptix to client {user}\t{message}");
        }
    }
}