import discord
from discord.ext import commands
import config

intents = discord.Intents.default()
intents.messages = True
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

# Load commands from the commands folder
from commands.books import setup as book_setup
from commands.reviews import setup as review_setup
from commands.auth import setup as auth_setup

book_setup(bot)
review_setup(bot)
auth_setup(bot)

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user}")

bot.run(config.BOT_TOKEN)
