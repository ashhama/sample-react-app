

class SectionCompletedDisplayModel {
  sectionName: string;
  completed: boolean;

  constructor(sectionName: string, completed: boolean) {
    this.sectionName = sectionName;
    this.completed = completed;
  }
}

export default SectionCompletedDisplayModel;
