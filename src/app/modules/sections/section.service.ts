import BaseService from '../../../shared/BaseService';
import { Section } from './section.model';
import { ISection } from './section.interface';
import { Chapter } from '../chapters/chapter.model';

class SectionService extends BaseService<ISection> {
  constructor() {
    super(Section);
  }

  async getByIdWithChapters(id: string) {
    const section = await this.getById(id);
    if (!section) {
      return null;
    }
    const chapters = await Chapter.find({ sectionId: id });
    return { ...section.toObject(), chapters };
  }
}

export const sectionService = new SectionService();
