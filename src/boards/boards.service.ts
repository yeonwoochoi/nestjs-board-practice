import {Injectable, NotFoundException} from '@nestjs/common';
import {BoardStatus} from './boards.status.enum';
import {CreateBoardDto} from './dto/create-board.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Board} from './board.entity';
import {BoardRepository} from './board.repository';
import {User} from "../auth/user.entity";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private readonly boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find(); // BoardRepository의 find() 메서드 사용
  }

  async getAllUserBoards(user: User): Promise<Board[]> {
    return await this.boardRepository
        .createQueryBuilder('board')
        .where("board.userId = :userId", { userId: user.id })
        .getMany()
    //   return this.boardRepository.find({ where: { userId: user.id } }); 랑 같은 코드
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    return this.boardRepository.save(board)
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
  }
}
