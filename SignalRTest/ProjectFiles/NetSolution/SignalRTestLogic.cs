#region Using directives
using System;
using UAManagedCore;
using OpcUa = UAManagedCore.OpcUa;
using FTOptix.EventLogger;
using FTOptix.HMIProject;
using FTOptix.NativeUI;
using FTOptix.UI;
using FTOptix.Alarm;
using FTOptix.CoreBase;
using FTOptix.SQLiteStore;
using FTOptix.Store;
using FTOptix.Retentivity;
using FTOptix.Core;
using FTOptix.NetLogic;
#endregion
using Microsoft.AspNetCore.SignalR.Client;
using System.Diagnostics;
using System.Threading.Tasks;
using SignalRTest;
using FTOptix.Report;
using FTOptix.MicroController;
using FTOptix.CommunicationDriver;

public class SignalRTestLogic : BaseNetLogic
{
    public override void Start()
    {
        connection = new HubConnectionBuilder()
            .WithUrl(new Uri("https://localhost:7127/chathub"))
            .WithAutomaticReconnect()
            .Build();
        Log.Info("Signal R Start", connection.ToString());
        connection.Reconnecting += error =>
        {
            Debug.Assert(connection.State == HubConnectionState.Reconnecting);
            Log.Warning("Connection lost. Reconnecting.");
            // Notify users the connection was lost and the client is reconnecting.
            // Start queuing or dropping messages.

            return Task.CompletedTask;
        };
        connection.Closed += error =>
        {
            Debug.Assert(connection.State == HubConnectionState.Disconnected);
            Log.Warning($"Connection closed with error: {error}");
            // Notify users the connection has been closed or manually try to restart the connection.

            return Task.CompletedTask;
        };
        Connect();
    }

    public override void Stop()
    {
        // Insert code to be executed when the user-defined logic is stopped
    }

    private void Connect()
    {
        connection.On<string, string>("ReceiveMessage", (user, message) =>
        {
            Log.Info("Signal R",$"ReceiveMessage:{user},{message}");
        });

        connection.On<string, string>("PumpClickedOnOptix", (user, message) =>
        {
            Log.Info("Signal R", $"PumpClickedOnOptix:{user},{message}");
            switch (message)
            {
                case "755":
                    Project.Current.GetVariable("Model/Get755").Value = true;
                    break;
                case "525":
                    Project.Current.GetVariable("Model/Get525").Value = true;
                    break;
            }
        });

        try
        {
            connection.StartAsync();
            Log.Info("Signal R", $"Connnected");
        }
        catch (Exception ex)
        {
            Log.Warning("Signal R",ex.Message); 
        }
    }
    [ExportMethod]
    public void SendCWTemperature(float value)
    {
        try
        {
            connection.InvokeAsync("SendMessage", "optix", "CW", $"{value:n2}");
            Log.Info("Signal R", $"SendMessage CW: {value:n2}");
        }
        catch (Exception ex)
        {
            Log.Warning("Signal R", ex.Message);
        }
    }

    [ExportMethod]
    public void SendHWTemperature(float value)
    {
        try
        {
            connection.InvokeAsync("SendMessage", "optix", "HW", $"{value:n2}");
            Log.Info("Signal R", $"SendMessage HW :{value:n2}");
        }
        catch (Exception ex)
        {
            Log.Warning("Signal R", ex.Message);
        }
    }

    [ExportMethod]
    public void SendAlarms(string message)
    {
        try
        {
            connection.InvokeAsync("SendMessage", "optix", "Alarm", message);
            Log.Info("Signal R", $"SendMessage Alarm {message}");
        }
        catch (Exception ex)
        {
            Log.Warning("Signal R", ex.Message);
        }
    }

    [ExportMethod]
    public void PumpsChangeStatus(string name,int status)
    {
        try
        {
            switch (status)
            {
                case 10:
                    connection.InvokeAsync("PumpsChangeStatus","optix",name, "Running");
                    break;
                case 6:
                    connection.InvokeAsync("PumpsChangeStatus", "optix", name, "Stopped");
                    break;
                case -1:
                    connection.InvokeAsync("PumpsChangeStatus", "optix", name, "Alarmed");
                    break;            
            }
            Log.Info("Signal R", $"SendMessage:{name}-{status}");
        }
        catch (Exception ex)
        {
            Log.Warning("Signal R", ex.Message);
        }
    }
    private HubConnection connection;
}
