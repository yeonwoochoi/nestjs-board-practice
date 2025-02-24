import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boards.status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');

  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    this.logger.verbose('Retrieving all boards');
    return this.boardsService.getAllBoards();
  }

  @Get('/user')
  getAllUserBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User "${user.username}" retrieving all their boards`);
    return this.boardsService.getAllUserBoards(user);
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    this.logger.verbose(`Retrieving board with ID: ${id}`);
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
    this.logger.verbose(`User "${user.username}" creating a new board: ${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    this.logger.verbose(`Updating board ID ${id} status to ${status}`);
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`User "${user.username}" deleting board with ID: ${id}`);
    return this.boardsService.deleteBoard(id);
  }
}
