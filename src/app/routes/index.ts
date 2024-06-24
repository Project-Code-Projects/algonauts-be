import express from 'express';
import { UserRoutes } from '../modules/users/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PostRoutes } from '../modules/posts/post.routes';
import { likeRoutes } from '../modules/posts/like.routes';
import { CommentRoutes } from '../modules/posts/comment.routes';
import { ParentRoutes } from '../modules/parents/parent.routes';
import { StudentRoutes } from '../modules/students/student.routes';
import { InstructorRoutes } from '../modules/instructors/instructor.routes';
import { HelpRequestRoutes } from '../modules/helpRequests/helpRequest.routes';
import { ParentMeetingRoutes } from '../modules/parentTeacherMeetings/parentMeeting.routes';
import { SectionRoutes } from '../modules/sections/section.routes';
import { ChapterRoutes } from '../modules/chapters/chapter.routes';
import { ExerciseRoutes } from '../modules/exercises/exercise.routes';
import { BlockLevelRoutes } from '../modules/blockLevels/blockLevel.routes';
import { EditorLevelRoutes } from '../modules/editorLevels/editorLevel.routes';
import { BeginnerLevelRoutes } from '../modules/beginnerLevels/beginnerLeve.routes';
import { exerciseLogRoutes } from '../modules/exercises/exerciseLog.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/like',
    route: likeRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/parent',
    route: ParentRoutes,
  },
  {
    path: '/student',
    route: StudentRoutes,
  },
  {
    path: '/instructor',
    route: InstructorRoutes,
  },
  {
    path: '/help-request',
    route: HelpRequestRoutes,
  },
  {
    path: '/parent-meeting',
    route: ParentMeetingRoutes,
  },
  {
    path: '/section',
    route: SectionRoutes,
  },
  {
    path: '/chapter',
    route: ChapterRoutes,
  },
  {
    path: '/exercise',
    route: ExerciseRoutes,
  },
  {
    path: '/block-level',
    route: BlockLevelRoutes,
  },
  {
    path: '/editor-level',
    route: EditorLevelRoutes,
  },
  {
    path: '/beginner-level',
    route: BeginnerLevelRoutes,
  },
  {
    path: '/exercise-log',
    route: exerciseLogRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
