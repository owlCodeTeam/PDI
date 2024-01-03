import { userRepositoryInterface } from "../userRepository.interface";

export class DeleteUsecase {
  constructor(readonly repo: userRepositoryInterface) {}
  public async execute(_id: string): Promise<void> {
    await this.repo.delete(_id);
  }
}
