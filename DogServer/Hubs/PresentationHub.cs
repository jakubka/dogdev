using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;

namespace DogServer.Hubs
{
    public class State
    {
        public bool IsGameStarted { get; set; }
        
        public double PlayerOrientation { get; set; }
        
        public double PlayerHealth { get; set; }

        public double? CreatureOrientation { get; set; }

        public double? CreatureDistance { get; set; }

        public int FragsCount { get; set; }
    }


    public class PresentationHub : Hub
    {
        public void LogState(State state)
        {
            Clients.Others.displayState(state);

            string json = JsonConvert.SerializeObject(state);
            Debug.WriteLine(json);
        }
    }
}