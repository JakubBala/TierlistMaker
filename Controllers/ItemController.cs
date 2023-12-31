﻿using Microsoft.AspNetCore.Mvc;
using TierlistMaker.Models;

namespace TierlistMaker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemController : ControllerBase
    {
        private static readonly IEnumerable<ItemModel> Items = new[]
        {
            new ItemModel { Id = 1, Title = "CS:GO", ImageId = 2, RowNum = 0, Ranking = 0, ItemType = 1 },
            new ItemModel { Id = 2, Title = "Valorant", ImageId = 8, RowNum = 0, Ranking = 0, ItemType = 1 },
            new ItemModel { Id = 3, Title = "League of Legends", ImageId = 3, RowNum = 0, Ranking = 0, ItemType = 1 },
            new ItemModel { Id = 4, Title = "Call of Duty", ImageId = 1, RowNum = 0, Ranking = 0, ItemType = 1 },
            new ItemModel { Id = 5, Title = "Rainbow 6 Seige", ImageId = 5, RowNum = 0, Ranking = 0, ItemType = 1 },
            new ItemModel { Id = 6, Title = "Rocket League", ImageId = 6, RowNum = 0, Ranking = 0, ItemType = 1 },
            new ItemModel { Id = 7, Title = "Overwatch", ImageId = 4, RowNum = 0, Ranking = 0, ItemType = 1 },
            new ItemModel { Id = 8, Title = "Super Smash Bros", ImageId = 7,RowNum = 0, Ranking = 0, ItemType = 1 },

            new ItemModel {Id = 9, Title = "France", ImageId = 9, RowNum = 0, Ranking=0, ItemType = 2 },
            new ItemModel {Id = 10, Title = "GB", ImageId = 10, RowNum = 0, Ranking=0, ItemType = 2 },
            new ItemModel {Id = 11, Title = "Germany", ImageId = 11, RowNum = 0, Ranking=0, ItemType = 2 },
            new ItemModel {Id = 12, Title = "Italy", ImageId = 12, RowNum = 0, Ranking=0, ItemType = 2 },
            new ItemModel {Id = 13, Title = "Poland", ImageId = 13, RowNum = 0, Ranking=0, ItemType = 2 }
        };


        /// <summary>
        /// Returns array of all items of a given item type
        /// </summary>
        [HttpGet("{itemType:int}")]
        public ItemModel[] Get(int itemType)
        {
            ItemModel[] items = Items.Where(i => i.ItemType == itemType).ToArray();
            return items;
        }
    }
}
