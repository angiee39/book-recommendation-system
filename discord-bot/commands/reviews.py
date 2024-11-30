import requests
import discord
from discord.ext import commands
import config

def setup(bot):
    @bot.command()
    async def addreview(ctx, book_id, rating, comment):
        """Add a review to a book."""
        response = requests.post(
            f"{config.API_URL}reviews/",
            json={"book": book_id, "rating": rating, "comment": comment}
        )
        if response.status_code == 201:
            await ctx.send(f"Review added successfully to book {book_id}!")
        else:
            await ctx.send("Failed to add the review.")

    @bot.command()
    async def listreviews(ctx, book_id):
        """List all reviews for a book."""
        response = requests.get(f"{config.API_URL}reviews/", params={"book": book_id})
        if response.status_code == 200:
            reviews = response.json()
            for review in reviews:
                await ctx.send(f"ID {review['id']}: {review['rating']}/5 - {review['comment']}")
        else:
            await ctx.send("Failed to fetch reviews.")

    @bot.command()
    async def deletereview(ctx, review_id):
        """Delete a review."""
        response = requests.delete(f"{config.API_URL}reviews/{review_id}/")
        if response.status_code == 204:
            await ctx.send(f"Review {review_id} deleted successfully!")
        else:
            await ctx.send("Failed to delete the review.")
