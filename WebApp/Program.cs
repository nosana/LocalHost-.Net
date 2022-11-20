using Microsoft.AspNetCore.Routing.Matching;
using Microsoft.CodeAnalysis.Options;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<MyContext>(option =>
                        option.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection")));

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(15);
    
});
// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddCors(options => 
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
