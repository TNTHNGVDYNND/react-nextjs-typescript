import type { Lesson } from './lessons-data';
export type { Lesson } from './lessons-data';
export { lessons } from './lessons-data';

export function renderLessons(lessonList: Lesson[]): string {
  return lessonList
    .map(
      (lesson) => `
    <article class="lesson-card">
      <span class="lesson-number">${String(lesson.number).padStart(2, '0')}</span>
      <div class="lesson-body">
        <h2 class="lesson-title">${lesson.title}</h2>
        <p class="lesson-desc">${lesson.description}</p>
        <div class="lesson-topics">
          ${lesson.topics.map((topic) => `<span class="topic-tag">${topic}</span>`).join('')}
        </div>
        <a href="src/lessons/${lesson.id}.ts?raw" class="lesson-link" target="_blank">Open lesson</a>
      </div>
    </article>`,
    )
    .join('');
}
