// src/games/controller.ts
import { JsonController, Get, Put, Body, Post, HttpCode, NotFoundError, Param, BadRequestError, Authorized, BodyParam } from 'routing-controllers'
import Game from './entity'

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
      const games = await Game.find()
      return { games }
    }

    @Put('/games/:id')
    async updateGame(
      @Param('id') id: number,

      @BodyParam("color") color: string,
      @BodyParam("name") name: string,

      @Body() update: Partial<Game>
    ) {
      
      const game = await Game.findOne(id)

      if (!game) {
        throw new NotFoundError('Cannot find game')
      } else {

        game.name = name
        game.color = color

        const rightColor = ["red", "blue", "green", "yellow", "magenta"]

        const moves = (board1, board2) => 
          board1
            .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
            .reduce((a, b) => a.concat(b))
            .length

        if (rightColor.includes(game.color)) {

          return Game.merge(game, update).save()
      
        } else if (moves.length > 1){

          throw new BadRequestError('No more than 1 move at a time!')
          
        } else {
          throw new Error('Enter a valid color!') 
        }
        
        
      }      
    }

    @Post('/games')
    @HttpCode(201)
    createPage(
        @BodyParam("name") name : string
    ) {
      const colorList = ["red", "blue", "green", "yellow", "magenta"]
      const randomColor = colorList[Math.floor(Math.random() * colorList.length)];
      
      const newGame = new Game()
      
      newGame.name = name
      newGame.color = randomColor
      newGame.board = [
        ['o', 'o', 'o'],
        ['o', 'o', 'o'],
        ['o', 'o', 'o']
      ]

      return newGame.save()
    }

}