import requests
import discord
from discord.ext import commands
import config

def setup(bot):
    @bot.command()
    async def addbook(ctx, title, author, genre):
        """Add a book to the collection."""
        response = requests.post(
            f"{config.API_URL}books/",
            json={"title": title, "author": author, "genre": genre}
        )
        if response.status_code == 201:
            await ctx.send(f"Book '{title}' added successfully!")
        else:
            await ctx.send("Failed to add the book.")

    @bot.command()
    async def listbooks(ctx):
        """List all books in the collection."""
        response = requests.get(f"{config.API_URL}books/")
        if response.status_code == 200:
            books = response.json()
            for book in books:
                await ctx.send(f"{book['id']}: {book['title']} by {book['author']} ({book['description']})")
        else:
            await ctx.send("Failed to fetch books.")

    @bot.command()
    async def editbook(ctx, book_id, title=None, author=None, genre=None):
        """Edit a book's details."""
        data = {k: v for k, v in {"title": title, "author": author, "genre": genre}.items() if v}
        response = requests.put(f"{config.API_URL}books/{book_id}/", json=data)
        if response.status_code == 200:
            await ctx.send(f"Book {book_id} updated successfully!")
        else:
            await ctx.send("Failed to update the book.")

    @bot.command()
    async def deletebook(ctx, book_id):
        """Delete a book from the collection."""
        response = requests.delete(f"{config.API_URL}books/{book_id}/")
        if response.status_code == 204:
            await ctx.send(f"Book {book_id} deleted successfully!")
        else:
            await ctx.send("Failed to delete the book.")
