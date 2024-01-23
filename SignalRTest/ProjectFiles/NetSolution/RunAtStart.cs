#region Using directives
using System;
using UAManagedCore;
using OpcUa = UAManagedCore.OpcUa;
using FTOptix.HMIProject;
using FTOptix.NetLogic;
using FTOptix.Alarm;
using FTOptix.UI;
using FTOptix.NativeUI;
using FTOptix.CoreBase;
using FTOptix.EventLogger;
using FTOptix.SQLiteStore;
using FTOptix.Store;
using FTOptix.Retentivity;
using FTOptix.Core;
using FTOptix.Report;
using System.IO;
#endregion

public class RunAtStart : BaseNetLogic
{
    public override void Start()
    {
        // Insert code to be executed when the user-defined logic is started
    }

    public override void Stop()
    {
        // Insert code to be executed when the user-defined logic is stopped
    }
    [ExportMethod]
    public void RunAtStartMethod()
    {
        // Insert code to be executed when the user-defined logic is started
        string aaa = GetPdfFilePath();
        string directory = Path.GetDirectoryName(aaa);
        string filename = Path.GetFileNameWithoutExtension(aaa);
        string ex = Path.GetExtension(aaa);
        string addtime = DateTime.Now.ToString("yyyyMMddHHmmss");
        string newFileName = String.Format("{0}\\{1}_{2}{3}", directory,filename, addtime,ex);
        File.Create(newFileName).Close();
        var value = ResourceUri.FromAbsoluteFilePath(newFileName);
        //Log.Info("test", value.Uri);
        Owner.GetVariable("Output1").Value = value;

    }

    private string GetPdfFilePath()
    {
        var csvPathVariable = Owner.GetVariable("Output"); ;
        if (csvPathVariable == null)
            throw new Exception("CSVPath variable not found");
        return new ResourceUri(csvPathVariable.Value).Uri;
    }
}
