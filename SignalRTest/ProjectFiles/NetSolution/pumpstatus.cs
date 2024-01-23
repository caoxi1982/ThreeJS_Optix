using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FTOptix.Report;
using FTOptix.MicroController;
using FTOptix.CommunicationDriver;

namespace SignalRTest
{
    enum Status : int
    {
        Running = 10,
        Stopped = 6,
        Alarmed = -1
    }
}
