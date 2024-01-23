using webapi;
//using Microsoft.Extensions.Logging;
var builder = WebApplication.CreateBuilder(args);
builder.Logging.AddDebug();


var AllAllowed = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllAllowed,
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:3000").AllowAnyHeader().AllowAnyMethod();
                          policy.AllowCredentials();
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors(AllAllowed);
app.MapHub<ChatHub>("/chatHub");

app.Run();
