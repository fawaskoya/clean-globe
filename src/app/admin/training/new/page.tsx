import Link from "next/link";
import { TrainingCourseForm, EMPTY_TRAINING_COURSE } from "@/components/admin/TrainingCourseForm";

export default function NewTrainingCoursePage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/training" className="text-lime hover:text-forest mb-4 inline-block">← Back to Training Courses</Link>
        <h1 className="text-3xl font-bold text-forest font-serif">Add Course</h1>
      </div>
      <TrainingCourseForm initial={EMPTY_TRAINING_COURSE} />
    </div>
  );
}
