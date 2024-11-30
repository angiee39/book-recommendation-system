import requests
import discord
from discord.ext import commands
import config

def setup(bot):
    @bot.command()
    async def login(ctx, username, password):
        """Link Discord account to Book Recommendation System."""
        response = requests.post(f"{config.API_URL}auth/login/", data={"username": username, "password": password})
        if response.status_code == 200:
            token = response.json().get("token")
            await ctx.author.send(f"Login successful! Your token: {token}")
        else:
            await ctx.send("Login failed. Please check your credentials.")

    @bot.command()
    async def logout(ctx):
        """Logout from the Book Recommendation System."""
        # Logic to invalidate the token or handle logout.
        await ctx.send("Logged out!")
