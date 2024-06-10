import BaseService from '../../../shared/BaseService';
import { Chapter } from './chapter.model';
import { IChapter } from './chapter.interface';

class ChapterService extends BaseService<IChapter> {
  constructor() {
    super(Chapter);
  }
}

export const chapterService = new ChapterService();
