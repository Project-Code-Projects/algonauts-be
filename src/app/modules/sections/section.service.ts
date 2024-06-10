import BaseService from '../../../shared/BaseService';
import { Section } from './section.model';
import { ISection } from './section.interface';

class SectionService extends BaseService<ISection> {
  constructor() {
    super(Section);
  }
}

export const sectionService = new SectionService();
