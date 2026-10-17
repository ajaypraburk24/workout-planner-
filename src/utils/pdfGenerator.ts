import jsPDF from 'jspdf';
import { DayWorkoutPlan, DayOfWeek } from '../types/fitness';
import { WEEKLY_WORKOUT_PLANS } from '../data/workoutPlanData';

export function generateWorkoutPlanPdf(selectedDay?: DayOfWeek) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const plansToExport: DayWorkoutPlan[] = selectedDay
    ? [WEEKLY_WORKOUT_PLANS[selectedDay]]
    : (Object.values(WEEKLY_WORKOUT_PLANS) as DayWorkoutPlan[]);

  // Dark header styling
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 36, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('WORKOUT PLANNER PRO', 14, 18);

  // Subtitle
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Master Weekly Training Protocol & Periodized Exercises', 14, 26);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 150, 26);

  let yPos = 46;

  plansToExport.forEach((plan) => {
    // Check if new page is needed
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    // Day Header Box
    doc.setFillColor(241, 245, 249); // slate-100
    doc.roundedRect(14, yPos - 5, 182, 16, 2, 2, 'F');

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(`${plan.day.toUpperCase()} — ${plan.title}`, 18, yPos + 3);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Est. ${plan.estimatedDuration} mins | ~${plan.estimatedCalories} kcal | Focus: ${plan.targetMuscles}`,
      18,
      yPos + 9
    );

    yPos += 20;

    if (plan.exercises.length > 0) {
      plan.exercises.forEach((ex, idx) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }

        // Exercise numbering & title
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42);
        doc.text(`${idx + 1}. ${ex.name}`, 18, yPos);

        // Sets / Reps / Rest badge
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(16, 185, 129); // emerald
        doc.text(
          `[ ${ex.sets} Sets | ${ex.reps} | Rest: ${ex.restTime}s | ${ex.caloriesBurned} kcal ]`,
          85,
          yPos
        );

        yPos += 5;

        // Description
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        const splitDesc = doc.splitTextToSize(ex.description, 175);
        doc.text(splitDesc, 20, yPos);
        yPos += splitDesc.length * 4.2;

        // Pro tips
        if (ex.tips && ex.tips.length > 0) {
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(100, 116, 139);
          const tipText = `Tip: ${ex.tips[0]}`;
          const splitTip = doc.splitTextToSize(tipText, 175);
          doc.text(splitTip, 20, yPos);
          yPos += splitTip.length * 4;
        }

        yPos += 4;
      });
    } else if (plan.recoveryActivities) {
      plan.recoveryActivities.forEach((act, idx) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(10.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42);
        doc.text(`${idx + 1}. ${act.name} (${act.duration})`, 18, yPos);

        yPos += 5;
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        const splitDesc = doc.splitTextToSize(act.description, 175);
        doc.text(splitDesc, 20, yPos);
        yPos += splitDesc.length * 4.2;
        yPos += 3;
      });
    }

    yPos += 8;
  });

  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Workout Planner Pro • Page ${i} of ${pageCount} • Consult physician before starting new protocols.`,
      14,
      290
    );
  }

  doc.save(
    selectedDay
      ? `Workout-Plan-${selectedDay}.pdf`
      : 'Workout-Planner-Pro-Weekly-Plan.pdf'
  );
}
