using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace DogServer.Hubs
{
    public class State
    {
        public bool IsGameStarted { get; set; }
        
        public int PlayerOrientation { get; set; }
        
        public int PlayerHealth { get; set; }

        public int? CreatureOrientation { get; set; }

        public int? CreatureDistance { get; set; }

        public int FragsCount { get; set; }
    }


    public class PresentationHub : Hub
    {
        public void LogState(State state)
        {
            Clients.Others.displayState(state);
        }
    }
}