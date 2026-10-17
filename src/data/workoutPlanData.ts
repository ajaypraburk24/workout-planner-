import { DayWorkoutPlan, DayOfWeek } from '../types/fitness';

export const WEEKLY_WORKOUT_PLANS: Record<DayOfWeek, DayWorkoutPlan> = {
  Monday: {
    day: 'Monday',
    title: 'Chest & Triceps',
    tagline: 'Upper Body Pushing Power & Hypertrophy',
    targetMuscles: 'Pectoralis Major/Minor, Anterior Delts, Triceps Brachii',
    estimatedDuration: 55,
    estimatedCalories: 420,
    exercises: [
      {
        id: 'push-ups',
        name: 'Push Ups',
        muscleGroup: 'Chest',
        secondaryMuscles: ['Triceps', 'Anterior Deltoids', 'Core'],
        sets: 4,
        reps: '12-15 reps',
        restTime: 60,
        caloriesBurned: 65,
        difficulty: 'Beginner',
        equipment: 'Bodyweight',
        description: 'A fundamental compound calisthenic movement targeting the pecs, front shoulders, and triceps while demanding total body core stiffness.',
        tips: [
          'Maintain a rigid straight plank line from heels to ears throughout the movement.',
          'Keep elbows tucked at a 45-degree angle to protect your rotator cuffs.',
          'Lower down with control until your chest is 1 inch off the floor, then explosively push up.'
        ],
        instructions: [
          'Place hands slightly wider than shoulder-width apart on the floor.',
          'Engage glutes, quads, and abdominal wall to maintain spinal alignment.',
          'Inhale and lower your entire body by unlocking your elbows until chest kisses the floor.',
          'Exhale forcefully and press through palms back up to full extension without arching back.'
        ]
      },
      {
        id: 'bench-press',
        name: 'Bench Press',
        muscleGroup: 'Chest',
        secondaryMuscles: ['Triceps', 'Shoulders'],
        sets: 4,
        reps: '8-10 reps',
        restTime: 90,
        caloriesBurned: 95,
        difficulty: 'Intermediate',
        equipment: 'Barbell & Bench',
        description: 'The premier upper-body barbell pressing strength exercise for maximizing middle and lower pectoral hypertrophy and raw pressing power.',
        tips: [
          'Retract your scapulae (pinch shoulder blades together) and plant both feet firmly into the floor.',
          'Lower the barbell smoothly to the lower chest/nipple line.',
          'Drive through your heels to generate leg drive without lifting your glutes off the bench.'
        ],
        instructions: [
          'Lie flat on the bench with eyes directly under the racked bar.',
          'Grip the bar slightly wider than shoulder width with a full secure grip.',
          'Unrack bar with arms locked, stabilize bar over mid-chest.',
          'Lower bar smoothly to light chest contact while keeping forearms vertical.',
          'Drive bar back up in a slight backward J-curve to the start position.'
        ]
      },
      {
        id: 'incline-dumbbell-press',
        name: 'Incline Dumbbell Press',
        muscleGroup: 'Chest',
        secondaryMuscles: ['Clavicular Head', 'Triceps', 'Front Delts'],
        sets: 3,
        reps: '10-12 reps',
        restTime: 75,
        caloriesBurned: 75,
        difficulty: 'Intermediate',
        equipment: 'Dumbbells & Incline Bench (30°)',
        description: 'Emphasizes the clavicular (upper) head of the pectoral muscles with dumbbells providing superior range of motion and joint freedom.',
        tips: [
          'Set bench to a 30 to 45 degree angle; higher angles shift load onto the shoulders.',
          'Converge dumbbells at the peak contraction without clanking them together.',
          'Do not flare elbows perpendicular to torso.'
        ],
        instructions: [
          'Sit on the incline bench with dumbbells resting on thighs.',
          'Kick weights up one at a time using knees as you lean back.',
          'Press dumbbells up with palms facing forward, rotating slightly inward at the top.',
          'Lower dumbbells slowly until you feel a deep stretch in upper pecs, then press up.'
        ]
      },
      {
        id: 'chest-fly',
        name: 'Chest Fly',
        muscleGroup: 'Chest',
        secondaryMuscles: ['Anterior Deltoids'],
        sets: 3,
        reps: '12-15 reps',
        restTime: 60,
        caloriesBurned: 55,
        difficulty: 'Intermediate',
        equipment: 'Dumbbells or Cable Machine',
        description: 'An isolation exercise emphasizing adduction of the humerus, delivering an exceptional stretch and mind-muscle contraction.',
        tips: [
          'Maintain a soft, fixed bend at the elbows throughout; do not bend or straighten them during the rep.',
          'Imagine hugging a large oak tree at the peak of the movement.',
          'Focus on squeezing the inner pectoral fibers at the top.'
        ],
        instructions: [
          'Lie on a flat bench holding dumbbells extended above chest with palms facing each other.',
          'Slowly lower weights out in a wide arc until chest is stretched comfortably.',
          'Reverse the arc using pectoral contraction to bring weights back together.'
        ]
      },
      {
        id: 'triceps-pushdown',
        name: 'Triceps Pushdown',
        muscleGroup: 'Triceps',
        secondaryMuscles: ['Forearms'],
        sets: 3,
        reps: '12-15 reps',
        restTime: 60,
        caloriesBurned: 50,
        difficulty: 'Beginner',
        equipment: 'Cable Machine & Rope/Bar',
        description: 'Direct isolation exercise targeting the lateral and medial heads of the triceps brachii for horseshoe-shaped arm definition.',
        tips: [
          'Glue elbows to your ribcage; only your forearms should move.',
          'Spread the rope apart at the bottom for maximum peak contraction.',
          'Avoid leaning forward over the rope to cheat with bodyweight.'
        ],
        instructions: [
          'Stand facing cable stack with high pulley rope attachment.',
          'Grip rope with neutral grip, pull down until elbows are pinned at sides.',
          'Extend arms downward until elbows are fully locked out and flare rope ends outwards.',
          'Control the return to 90 degrees before initiating next rep.'
        ]
      },
      {
        id: 'dips',
        name: 'Dips',
        muscleGroup: 'Triceps',
        secondaryMuscles: ['Lower Chest', 'Anterior Delts'],
        sets: 3,
        reps: '8-12 reps',
        restTime: 75,
        caloriesBurned: 80,
        difficulty: 'Advanced',
        equipment: 'Parallel Dip Bars',
        description: 'Regarded as the "upper body squat", dips deliver intense compound loading across the triceps, chest, and shoulder girdle.',
        tips: [
          'Stay upright to bias the triceps; lean slightly forward to bias the lower chest.',
          'Lower yourself until upper arms are parallel to the floor (approx 90-degree elbow bend).',
          'Lock out under control at the top without hyperextending elbows.'
        ],
        instructions: [
          'Mount dip bars and lock arms with wrists straight.',
          'Lower torso under control by bending elbows backwards.',
          'Descend to roughly 90 degrees at the elbow joint.',
          'Push through your palms to return to starting position.'
        ]
      }
    ]
  },
  Tuesday: {
    day: 'Tuesday',
    title: 'Back & Biceps',
    tagline: 'Posterior Chain Pulling Power & V-Taper Sculpting',
    targetMuscles: 'Latissimus Dorsi, Rhomboids, Trapezius, Erector Spinae, Biceps Brachii',
    estimatedDuration: 60,
    estimatedCalories: 480,
    exercises: [
      {
        id: 'pull-ups',
        name: 'Pull Ups',
        muscleGroup: 'Back',
        secondaryMuscles: ['Biceps', 'Brachialis', 'Core', 'Lats'],
        sets: 4,
        reps: '6-10 reps',
        restTime: 90,
        caloriesBurned: 85,
        difficulty: 'Advanced',
        equipment: 'Pull-Up Bar',
        description: 'The king of bodyweight vertical pulling, developing broad lats, grip resilience, and upper back thickness.',
        tips: [
          'Start each repetition from a full dead hang to recruit the full length of the lat fibers.',
          'Depress and retract scapulae before bending your arms.',
          'Pull your chest up toward the bar rather than just craning your chin over.'
        ],
        instructions: [
          'Grip the bar slightly wider than shoulder width with an overhand pronated grip.',
          'Hang with arms extended and engage shoulder blades down and back.',
          'Drive elbows down towards hips until chin clearly clears the bar.',
          'Lower smoothly to full arm extension.'
        ]
      },
      {
        id: 'deadlift',
        name: 'Deadlift',
        muscleGroup: 'Back',
        secondaryMuscles: ['Hamstrings', 'Glutes', 'Erector Spinae', 'Traps', 'Forearms'],
        sets: 4,
        reps: '5-8 reps',
        restTime: 120,
        caloriesBurned: 130,
        difficulty: 'Advanced',
        equipment: 'Barbell & Weight Plates',
        description: 'Total posterior powerhouse lift. Recruits virtually every muscle in the body from calves to traps with heavy loading.',
        tips: [
          'Keep the bar in contact with your shins and thighs throughout the entire pull.',
          'Take slack out of the bar before ripping it off the floor.',
          'Maintain a neutral lumbar spine and brace your diaphragm hard.'
        ],
        instructions: [
          'Stand with feet hip-width apart, bar over mid-foot.',
          'Hinge at hips, grip bar just outside knees, and drop hips until shins touch bar.',
          'Flatten back, engage lats, and pull chest tall.',
          'Drive floor away with your legs while keeping bar tight to legs.',
          'Stand erect at lockout by squeezing glutes, then return bar under control.'
        ]
      },
      {
        id: 'bent-over-row',
        name: 'Bent Over Row',
        muscleGroup: 'Back',
        secondaryMuscles: ['Rhomboids', 'Rear Delts', 'Biceps'],
        sets: 4,
        reps: '8-10 reps',
        restTime: 75,
        caloriesBurned: 80,
        difficulty: 'Intermediate',
        equipment: 'Barbell',
        description: 'Crucial compound horizontal row for building mid-back density, rhomboids, and lat thickness.',
        tips: [
          'Keep torso angled at roughly 45 degrees without using excessive hip bobbing.',
          'Pull the bar towards your lower ribcage/belly button.',
          'Squeeze shoulder blades together for 1 full second at the apex.'
        ],
        instructions: [
          'Hold barbell with overhand grip slightly wider than shoulder width.',
          'Hinge hips backwards until torso is angled forward with flat spine.',
          'Pull barbell smoothly towards lower abdomen, driving elbows straight back.',
          'Pause and contract mid-back, then lower weights with full control.'
        ]
      },
      {
        id: 'lat-pulldown',
        name: 'Lat Pulldown',
        muscleGroup: 'Back',
        secondaryMuscles: ['Biceps', 'Rear Delts', 'Teres Major'],
        sets: 3,
        reps: '10-12 reps',
        restTime: 60,
        caloriesBurned: 65,
        difficulty: 'Beginner',
        equipment: 'Lat Pulldown Cable Machine',
        description: 'Targeted machine pull for broad wing-like lat development and controlled eccentric loading.',
        tips: [
          'Avoid leaning back past 15-20 degrees; stay upright to target upper lats.',
          'Initiate the pull by pulling shoulder blades down before bending arms.',
          'Let bar travel smoothly back up for a deep overhead lat stretch.'
        ],
        instructions: [
          'Sit in machine with thighs secured snugly under leg pads.',
          'Grip wide bar with overhand grip and lean back slightly.',
          'Draw bar down until it touches upper chest, driving elbows downward.',
          'Control the bar on the ascent until arms and lats are fully stretched.'
        ]
      },
      {
        id: 'barbell-curl',
        name: 'Barbell Curl',
        muscleGroup: 'Biceps',
        secondaryMuscles: ['Forearms', 'Brachialis'],
        sets: 3,
        reps: '10-12 reps',
        restTime: 60,
        caloriesBurned: 50,
        difficulty: 'Beginner',
        equipment: 'Barbell or EZ-Curl Bar',
        description: 'The golden staple of bicep training, placing heavy tension on both the short and long heads of the biceps brachii.',
        tips: [
          'Keep your upper arms pinned at your sides throughout the curl.',
          'Do not swing your hips or arch lower back to heave the weight up.',
          'Lower the bar across a full 3-second negative.'
        ],
        instructions: [
          'Stand tall with feet shoulder-width apart, holding barbell with supinated grip.',
          'Keep upper arms glued to sides as you curl bar up towards chest level.',
          'Squeeze biceps forcefully at peak contraction.',
          'Slowly lower the bar back to full extension.'
        ]
      },
      {
        id: 'hammer-curl',
        name: 'Hammer Curl',
        muscleGroup: 'Biceps',
        secondaryMuscles: ['Brachialis', 'Brachioradialis (Forearm)'],
        sets: 3,
        reps: '12 reps each arm',
        restTime: 60,
        caloriesBurned: 45,
        difficulty: 'Beginner',
        equipment: 'Dumbbells',
        description: 'Neutral-grip dumbbell curls that build the brachialis muscle beneath the biceps, pushing the bicep peak higher and beefing up forearms.',
        tips: [
          'Maintain palms facing each other (neutral grip) throughout entire rep.',
          'Control the descent to build forearm grip strength and elbow tendon health.',
          'Alternate or curl both dumbbells synchronously.'
        ],
        instructions: [
          'Stand holding dumbbells at your sides with palms facing inwards.',
          'Curl weights upward while keeping palms facing inward throughout.',
          'Contract brachialis and forearm at the top.',
          'Lower smoothly back to starting position.'
        ]
      }
    ]
  },
  Wednesday: {
    day: 'Wednesday',
    title: 'Legs',
    tagline: 'Lower Body Strength, Quad Drive & Posterior Power',
    targetMuscles: 'Quadriceps, Hamstrings, Gluteus Maximus, Calves, Adductors',
    estimatedDuration: 65,
    estimatedCalories: 520,
    exercises: [
      {
        id: 'squats',
        name: 'Squats',
        muscleGroup: 'Legs',
        secondaryMuscles: ['Quadriceps', 'Glutes', 'Core', 'Erectors'],
        sets: 4,
        reps: '8-10 reps',
        restTime: 120,
        caloriesBurned: 120,
        difficulty: 'Intermediate',
        equipment: 'Barbell & Squat Rack',
        description: 'The undisputed cornerstone of lower-body development. Recruits quads, glutes, core, and promotes whole-body hormone response.',
        tips: [
          'Break at hips and knees simultaneously while keeping chest up and proud.',
          'Descend until thighs are at least parallel with the floor.',
          'Keep knees tracking inline with your toes; do not allow knees to cave inward.'
        ],
        instructions: [
          'Rest barbell comfortably across upper trapezius muscles.',
          'Stand with feet shoulder-width apart, toes angled out slightly 15-30 degrees.',
          'Inhale deeply into your belly and brace core.',
          'Hinge hips and bend knees downward until hip crease is below top of knee.',
          'Drive through whole foot to stand back up, exhaling at the top.'
        ]
      },
      {
        id: 'leg-press',
        name: 'Leg Press',
        muscleGroup: 'Legs',
        secondaryMuscles: ['Quadriceps', 'Glutes'],
        sets: 4,
        reps: '10-12 reps',
        restTime: 90,
        caloriesBurned: 90,
        difficulty: 'Beginner',
        equipment: '45-Degree Leg Press Machine',
        description: 'Allows intense quadricep overload without axial spinal loading, facilitating high-volume hypertrophy.',
        tips: [
          'Never lock your knees out violently at the top of the press.',
          'Keep your lower back and glutes pressed flat against the backrest.',
          'Vary foot placement: higher for glutes/hamstrings, lower for quad focus.'
        ],
        instructions: [
          'Sit securely with back and hips pressed against pad.',
          'Place feet shoulder-width apart in middle of sled platform.',
          'Disengage safety levers and bend knees towards chest until knees hit 90 degrees.',
          'Press sled away by pushing through midfoot and heels.'
        ]
      },
      {
        id: 'walking-lunges',
        name: 'Walking Lunges',
        muscleGroup: 'Legs',
        secondaryMuscles: ['Glutes', 'Hamstrings', 'Calves', 'Core Balance'],
        sets: 3,
        reps: '12 steps per leg',
        restTime: 75,
        caloriesBurned: 85,
        difficulty: 'Intermediate',
        equipment: 'Dumbbells or Bodyweight',
        description: 'Dynamic unilateral exercise that develops functional balance, deep glute activation, and individual leg power.',
        tips: [
          'Take a large enough stride so front knee does not excessively drift past toes.',
          'Lightly kiss trailing knee to the floor without slamming it.',
          'Keep torso upright and hips level.'
        ],
        instructions: [
          'Stand tall holding dumbbells at your sides or hands on hips.',
          'Step forward with right foot, sinking hips until both knees form 90-degree angles.',
          'Drive through front heel to step forward directly into the left leg lunge.',
          'Continue moving smoothly across the floor.'
        ]
      },
      {
        id: 'romanian-deadlift',
        name: 'Romanian Deadlift (RDL)',
        muscleGroup: 'Legs',
        secondaryMuscles: ['Hamstrings', 'Glutes', 'Lower Back'],
        sets: 3,
        reps: '10-12 reps',
        restTime: 90,
        caloriesBurned: 85,
        difficulty: 'Intermediate',
        equipment: 'Barbell or Dumbbells',
        description: 'The best hamstring and glute elongation builder. Uses a pure hip hinge to stretch and contract the posterior chain.',
        tips: [
          'Push your hips backward as if touching a wall behind you with your tailbone.',
          'Maintain a soft micro-bend in knees throughout; this is not a squat.',
          'Stop when you feel a deep hamstring stretch just below knee height.'
        ],
        instructions: [
          'Hold weight at hip level with shoulder-width stance.',
          'Hinge hips backwards while maintaining a flat, neutral spine.',
          'Lower weights along your shins until maximum hamstring tension is felt.',
          'Squeeze glutes to push hips forward to return to standing.'
        ]
      },
      {
        id: 'leg-curl',
        name: 'Leg Curl',
        muscleGroup: 'Legs',
        secondaryMuscles: ['Hamstrings', 'Calf Gastrocnemius'],
        sets: 3,
        reps: '12-15 reps',
        restTime: 60,
        caloriesBurned: 50,
        difficulty: 'Beginner',
        equipment: 'Lying or Seated Leg Curl Machine',
        description: 'Direct hamstring isolation targeting knee flexion for balanced leg health and knee stability.',
        tips: [
          'Do not lift your hips off the pad during the curl.',
          'Hold the peak contraction for 1 second before lowering slowly.',
          'Dorsiflex toes (point toes toward shins) for optimal hamstring recruitment.'
        ],
        instructions: [
          'Adjust machine pad to rest just above your ankles/Achilles tendon.',
          'Grip handles to stabilize pelvis against the pad.',
          'Curl legs upwards as far as possible towards your glutes.',
          'Lower smoothly across 3 seconds.'
        ]
      },
      {
        id: 'standing-calf-raise',
        name: 'Standing Calf Raise',
        muscleGroup: 'Legs',
        secondaryMuscles: ['Calf Gastrocnemius', 'Soleus'],
        sets: 4,
        reps: '15-20 reps',
        restTime: 45,
        caloriesBurned: 40,
        difficulty: 'Beginner',
        equipment: 'Calf Machine or Step with Dumbbell',
        description: 'Builds dense, diamond-shaped lower calves with full range of motion ankle plantarflexion.',
        tips: [
          'Get a full deep stretch at the bottom of each repetition.',
          'Hold peak extension at the top for 2 full seconds on your tiptoes.',
          'Never bounce rapidly; keep cadence slow and disciplined.'
        ],
        instructions: [
          'Position balls of feet on edge of step with heels hanging off.',
          'Lower heels down until you feel a maximum stretch through calves and Achilles.',
          'Press through balls of big toes to rise as high as possible.',
          'Hold peak contraction, then descend slowly.'
        ]
      }
    ]
  },
  Thursday: {
    day: 'Thursday',
    title: 'Shoulders',
    tagline: '3D Boulder Deltoid Cannonball Sculpting',
    targetMuscles: 'Anterior, Lateral, and Posterior Deltoids, Trapezius',
    estimatedDuration: 55,
    estimatedCalories: 430,
    exercises: [
      {
        id: 'military-press',
        name: 'Military Press',
        muscleGroup: 'Shoulders',
        secondaryMuscles: ['Triceps', 'Upper Chest', 'Core'],
        sets: 4,
        reps: '6-8 reps',
        restTime: 90,
        caloriesBurned: 85,
        difficulty: 'Intermediate',
        equipment: 'Barbell or Dumbbells',
        description: 'The quintessential standing overhead pressing movement for massive front delt strength and core stability.',
        tips: [
          'Squeeze glutes and brace abs tightly to prevent arching your lower back.',
          'Tuck chin back as bar passes face, then press head forward once cleared.',
          'Lock bar out directly over your ears at the top.'
        ],
        instructions: [
          'Clean barbell to front rack position across clavicles, elbows forward.',
          'Stand with feet shoulder-width apart, knees slightly unlocked.',
          'Press barbell vertically overhead until arms are fully extended.',
          'Lower bar smoothly back to clavicle level under control.'
        ]
      },
      {
        id: 'arnold-press',
        name: 'Arnold Press',
        muscleGroup: 'Shoulders',
        secondaryMuscles: ['Triceps', 'Upper Chest'],
        sets: 3,
        reps: '10-12 reps',
        restTime: 75,
        caloriesBurned: 70,
        difficulty: 'Intermediate',
        equipment: 'Dumbbells & Seated Bench',
        description: 'Created by Arnold Schwarzenegger, this rotational press works all three deltoid heads through an extended range of motion.',
        tips: [
          'Rotate smoothly as you press up; do not rush the twist.',
          'Keep shoulders depressed and away from ears.',
          'Finish with palms facing forward at the top.'
        ],
        instructions: [
          'Sit upright holding dumbbells in front of chest, palms facing towards you.',
          'As you press upward, rotate wrists outwards until palms face forward at full lockout.',
          'Reverse the rotational motion as you lower weights back to chest height.'
        ]
      },
      {
        id: 'lateral-raise',
        name: 'Lateral Raise',
        muscleGroup: 'Shoulders',
        secondaryMuscles: ['Traps'],
        sets: 4,
        reps: '12-15 reps',
        restTime: 60,
        caloriesBurned: 50,
        difficulty: 'Beginner',
        equipment: 'Dumbbells or Cables',
        description: 'The golden isolation exercise for widening the lateral deltoids to create a broad shoulder taper.',
        tips: [
          'Lead with your elbows, not your wrists or hands.',
          'Tilt dumbbells slightly like pouring from a water pitcher at the top.',
          'Avoid using momentum or swinging your torso.'
        ],
        instructions: [
          'Stand with feet hip-width apart, holding light dumbbells at sides.',
          'Raise arms outward to sides with a slight micro-bend in elbows.',
          'Lift until arms are parallel to the floor at shoulder height.',
          'Pause briefly, then lower slowly over 2 seconds.'
        ]
      },
      {
        id: 'front-raise',
        name: 'Front Raise',
        muscleGroup: 'Shoulders',
        secondaryMuscles: ['Clavicular Pecs'],
        sets: 3,
        reps: '12 reps',
        restTime: 60,
        caloriesBurned: 45,
        difficulty: 'Beginner',
        equipment: 'Dumbbells or Weight Plate',
        description: 'Isolates the anterior deltoid head for defined frontal shoulder separation.',
        tips: [
          'Raise weights directly to eye level.',
          'Do not lean backward or swing weights up with hip drive.',
          'Lower with controlled tempo.'
        ],
        instructions: [
          'Hold dumbbells in front of thighs with overhand grip.',
          'Lift weights straight forward until arms reach shoulder level.',
          'Hold for a beat at peak contraction.',
          'Lower smoothly to starting position.'
        ]
      },
      {
        id: 'rear-delt-fly',
        name: 'Rear Delt Fly',
        muscleGroup: 'Shoulders',
        secondaryMuscles: ['Rhomboids', 'Mid Trapezius'],
        sets: 4,
        reps: '15 reps',
        restTime: 60,
        caloriesBurned: 45,
        difficulty: 'Beginner',
        equipment: 'Dumbbells or Reverse Pec-Deck',
        description: 'Crucial postural exercise isolating the posterior deltoid to fix rounded shoulders and create complete 3D delts.',
        tips: [
          'Keep your elbows slightly bent and focus on pulling with the back of shoulders.',
          'Avoid shrugging shoulders up towards your neck.',
          'Squeeze rear deltoids at peak extension.'
        ],
        instructions: [
          'Hinge forward at hips until torso is nearly parallel to floor.',
          'Hold dumbbells hanging below chest with palms facing inward.',
          'Raise arms laterally out to the sides until upper arms align with back.',
          'Lower with control back down.'
        ]
      },
      {
        id: 'shrugs',
        name: 'Shrugs',
        muscleGroup: 'Shoulders',
        secondaryMuscles: ['Upper Trapezius', 'Forearms'],
        sets: 3,
        reps: '12-15 reps',
        restTime: 60,
        caloriesBurned: 50,
        difficulty: 'Beginner',
        equipment: 'Dumbbells or Barbell',
        description: 'Direct upper trapezius builder for thick neck support and upper back power.',
        tips: [
          'Elevate shoulders straight up toward ears; NEVER roll shoulders in circles.',
          'Hold and squeeze at the peak for 2 full seconds.',
          'Keep chin neutral, not jutting forward.'
        ],
        instructions: [
          'Stand tall holding heavy dumbbells at your sides.',
          'Elevate your shoulder girdle straight up toward your ears as high as possible.',
          'Hold the contraction firmly for 2 seconds.',
          'Lower smoothly under full control.'
        ]
      }
    ]
  },
  Friday: {
    day: 'Friday',
    title: 'Core & Abs',
    tagline: 'Six-Pack Definition, Spinal Stability & Rotational Power',
    targetMuscles: 'Rectus Abdominis, Obliques, Transverse Abdominis, Hip Flexors',
    estimatedDuration: 45,
    estimatedCalories: 380,
    exercises: [
      {
        id: 'crunches',
        name: 'Crunches',
        muscleGroup: 'Core',
        secondaryMuscles: ['Upper Rectus Abdominis'],
        sets: 4,
        reps: '20 reps',
        restTime: 45,
        caloriesBurned: 40,
        difficulty: 'Beginner',
        equipment: 'Mat',
        description: 'Classic flexion movement isolating the upper abdominal wall through spinal articulation.',
        tips: [
          'Do not pull on your neck with your hands; rest fingertips gently by temples.',
          'Exhale all air completely at the top of the crunch for maximum contraction.',
          'Think about rolling your ribcage down toward your pelvic bone.'
        ],
        instructions: [
          'Lie on back with knees bent, feet flat on floor hip-width apart.',
          'Place fingertips gently behind ears.',
          'Contract abs to curl head, neck, and shoulder blades off mat.',
          'Lower smoothly without relaxing abdominal tension.'
        ]
      },
      {
        id: 'leg-raises',
        name: 'Leg Raises',
        muscleGroup: 'Core',
        secondaryMuscles: ['Lower Rectus Abdominis', 'Hip Flexors'],
        sets: 4,
        reps: '15 reps',
        restTime: 45,
        caloriesBurned: 50,
        difficulty: 'Intermediate',
        equipment: 'Mat or Hanging Bar',
        description: 'Targets the lower aspect of the rectus abdominis through controlled pelvic tilt and leg elevation.',
        tips: [
          'Keep your lower back glued firmly against the floor at all times.',
          'Do not let feet touch the ground between reps to maintain constant tension.',
          'Lift pelvis slightly off the floor at the top for maximum lower ab activation.'
        ],
        instructions: [
          'Lie flat on back with legs straight and hands under lower back for support.',
          'Raise legs upward until perpendicular to the floor.',
          'Slowly lower legs towards the floor over 3 seconds, hovering 2 inches off ground.',
          'Repeat without arching your spine.'
        ]
      },
      {
        id: 'plank',
        name: 'Plank',
        muscleGroup: 'Core',
        secondaryMuscles: ['Transverse Abdominis', 'Glutes', 'Shoulders'],
        sets: 3,
        reps: '60 seconds',
        restTime: 45,
        caloriesBurned: 55,
        difficulty: 'Intermediate',
        equipment: 'Mat',
        description: 'Isometric anti-extension exercise creating deep core stability and protecting the lumbar spine.',
        tips: [
          'Actively pull your elbows toward your toes and squeeze your glutes hard.',
          'Never let your hips sag down or pike high in the air.',
          'Breathe rhythmically into your belly while bracing.'
        ],
        instructions: [
          'Rest on forearms and balls of feet, elbows directly under shoulders.',
          'Align body in one straight line from head to heels.',
          'Contract abdominal wall as if preparing for a punch.',
          'Hold with disciplined breathing for the target duration.'
        ]
      },
      {
        id: 'russian-twist',
        name: 'Russian Twist',
        muscleGroup: 'Core',
        secondaryMuscles: ['Internal & External Obliques'],
        sets: 3,
        reps: '20 twists (10 per side)',
        restTime: 45,
        caloriesBurned: 50,
        difficulty: 'Intermediate',
        equipment: 'Mat (Optional Weight Plate)',
        description: 'Rotational core exercise sculpting the obliques and enhancing twisting sports performance.',
        tips: [
          'Keep your chest high and back flat, avoiding slouching.',
          'Rotate your entire ribcage, not just your arms and hands.',
          'Hover feet off floor for an advanced challenge.'
        ],
        instructions: [
          'Sit on floor, bend knees, and lean back to a 45-degree angle.',
          'Clasp hands together in front of chest.',
          'Rotate torso to the right, tapping floor beside hip.',
          'Rotate smoothly to the left side in one continuous rhythm.'
        ]
      },
      {
        id: 'mountain-climbers',
        name: 'Mountain Climbers',
        muscleGroup: 'Core',
        secondaryMuscles: ['Hip Flexors', 'Cardio', 'Shoulders'],
        sets: 3,
        reps: '45 seconds',
        restTime: 45,
        caloriesBurned: 65,
        difficulty: 'Beginner',
        equipment: 'Mat',
        description: 'High-energy dynamic plank running movement combining core stability with cardiovascular fat burning.',
        tips: [
          'Maintain a stable plank without bouncing your hips up and down.',
          'Drive knees straight between your arms toward your chest.',
          'Keep wrists directly beneath shoulders.'
        ],
        instructions: [
          'Start in high push-up plank position.',
          'Drive right knee forward toward chest quickly.',
          'Switch legs dynamically in mid-air, bringing left knee forward.',
          'Maintain a steady athletic sprinting rhythm.'
        ]
      },
      {
        id: 'bicycle-crunch',
        name: 'Bicycle Crunch',
        muscleGroup: 'Core',
        secondaryMuscles: ['Rectus Abdominis', 'Obliques'],
        sets: 3,
        reps: '20 reps (10 per side)',
        restTime: 45,
        caloriesBurned: 50,
        difficulty: 'Beginner',
        equipment: 'Mat',
        description: 'Rated among the #1 most effective ab exercises by EMG studies for simultaneous rectus and oblique recruitment.',
        tips: [
          'Do not yank your head forward; rotate with your thoracic spine.',
          'Slow and controlled reps are vastly superior to flailing quickly.',
          'Fully extend the non-working leg straight out.'
        ],
        instructions: [
          'Lie on back with hands behind head and legs raised in tabletop position.',
          'Simultaneously bring right elbow to meet left knee while extending right leg.',
          'Switch smoothly, bringing left elbow to meet right knee.',
          'Continue in a pedaling bicycle motion.'
        ]
      }
    ]
  },
  Saturday: {
    day: 'Saturday',
    title: 'Full Body + Cardio',
    tagline: 'High-Octane Metabolic Conditioning & Total-Body Power',
    targetMuscles: 'Total Body Kinetic Chain, Cardiovascular & Glycolytic Engine',
    estimatedDuration: 55,
    estimatedCalories: 560,
    exercises: [
      {
        id: 'burpees',
        name: 'Burpees',
        muscleGroup: 'Full Body',
        secondaryMuscles: ['Chest', 'Quads', 'Core', 'Cardio Engine'],
        sets: 4,
        reps: '12-15 reps',
        restTime: 60,
        caloriesBurned: 110,
        difficulty: 'Advanced',
        equipment: 'Bodyweight',
        description: 'The ultimate bodyweight metabolic builder, working from floor drop to explosive vertical jump.',
        tips: [
          'Land softly on the balls of your feet to protect your joints.',
          'Kick back into a solid push-up plank rather than collapsing your hips.',
          'Pace your breathing rhythm to sustain intensity.'
        ],
        instructions: [
          'Stand tall, drop into a squat, and place hands on floor.',
          'Jump feet back into a plank, drop chest to floor for a push-up.',
          'Press up, jump feet forward toward hands, and explosively jump straight into air with hands overhead.'
        ]
      },
      {
        id: 'jump-rope',
        name: 'Jump Rope',
        muscleGroup: 'Cardio',
        secondaryMuscles: ['Calves', 'Forearms', 'Shoulders'],
        sets: 4,
        reps: '2 minutes',
        restTime: 45,
        caloriesBurned: 95,
        difficulty: 'Beginner',
        equipment: 'Jump Rope',
        description: 'Elite conditioning tool favored by boxers for footwork agility, calf elasticity, and rapid heart rate spikes.',
        tips: [
          'Turn the rope with small wrist circles, not by flailing your whole arms.',
          'Stay on the balls of your feet with only 1-2 inches of clearance off the floor.',
          'Keep your knees soft and shock-absorbent.'
        ],
        instructions: [
          'Hold rope handles at hip level with rope behind heels.',
          'Flick wrists forward to swing rope over head.',
          'Hop lightly as rope passes beneath feet, keeping rhythm smooth.'
        ]
      },
      {
        id: 'kettlebell-swings',
        name: 'Kettlebell Swings',
        muscleGroup: 'Full Body',
        secondaryMuscles: ['Glutes', 'Hamstrings', 'Lats', 'Core'],
        sets: 4,
        reps: '20 reps',
        restTime: 60,
        caloriesBurned: 100,
        difficulty: 'Intermediate',
        equipment: 'Kettlebell (16-24kg)',
        description: 'Ballistic hip hinge power movement that torch calories while developing unbreakable posterior chain strength.',
        tips: [
          'This is a hip hinge, NOT a squat. Your knees only bend slightly.',
          'Snap hips forward explosively and squeeze glutes hard at the top.',
          'Let arms act as loose ropes; do not lift the bell with your shoulders.'
        ],
        instructions: [
          'Stand with feet shoulder-width apart, kettlebell on floor 1 foot ahead.',
          'Hinge hips, grip kettlebell handle, hike bell back between legs like a football.',
          'Drive hips forward forcefully to swing bell up to chest level.',
          'Let gravity guide bell back between thighs, hinge, and repeat.'
        ]
      },
      {
        id: 'sat-push-ups',
        name: 'Push Ups (Tempo)',
        muscleGroup: 'Chest',
        secondaryMuscles: ['Triceps', 'Core'],
        sets: 3,
        reps: '15 reps',
        restTime: 45,
        caloriesBurned: 60,
        difficulty: 'Beginner',
        equipment: 'Bodyweight',
        description: 'Controlled rhythm push-ups maintaining high density muscle pump and chest endurance.',
        tips: [
          'Take 2 seconds down, pause 1 second at bottom, explode up.',
          'Keep core taut and shoulder blades active.'
        ],
        instructions: [
          'Assume high plank position.',
          'Lower chest under control, touch ground gently, and push straight back up.'
        ]
      },
      {
        id: 'sat-squats',
        name: 'Air Squats (Fast Cadence)',
        muscleGroup: 'Legs',
        secondaryMuscles: ['Glutes', 'Quads', 'Core'],
        sets: 3,
        reps: '25 reps',
        restTime: 45,
        caloriesBurned: 75,
        difficulty: 'Beginner',
        equipment: 'Bodyweight',
        description: 'Rapid bodyweight squats testing leg stamina, metabolic flow, and depth consistency.',
        tips: [
          'Ensure hips descend below knees on every single rep.',
          'Keep heels rooted to floor.'
        ],
        instructions: [
          'Stand with feet shoulder-width apart.',
          'Squat deeply, reaching arms forward for balance.',
          'Explode back up through heels to full standing.'
        ]
      },
      {
        id: 'running',
        name: 'High Intensity Running / Sprints',
        muscleGroup: 'Cardio',
        secondaryMuscles: ['Legs', 'Heart & Lungs'],
        sets: 1,
        reps: '15 minutes intervals',
        restTime: 60,
        caloriesBurned: 160,
        difficulty: 'Intermediate',
        equipment: 'Treadmill or Outdoor Track',
        description: 'Interval running: 30 seconds sprint, 60 seconds brisk recovery walk to maximize VO2 max and afterburn effect.',
        tips: [
          'Drive knees high and pump arms from hips to cheek.',
          'Breathe deeply in through nose, out through mouth.'
        ],
        instructions: [
          'Warm up with 3 minutes of jog.',
          'Perform 8-10 rounds of 30-second all-out sprint followed by 60-second recovery walk.',
          'Cool down with 2 minutes gentle walk.'
        ]
      }
    ]
  },
  Sunday: {
    day: 'Sunday',
    title: 'Recovery & Mobility',
    tagline: 'Active Rest, Tissue Restoration, Flexibility & Mental Recharging',
    targetMuscles: 'Full Myofascial System, Parasympathetic Nervous System',
    estimatedDuration: 40,
    estimatedCalories: 180,
    exercises: [], // Recovery day uses dedicated recovery activities
    recoveryActivities: [
      {
        id: 'stretching',
        name: 'Full Body Static & Dynamic Stretching',
        duration: '15 minutes',
        caloriesBurned: 45,
        description: 'Systematic head-to-toe stretching for hamstrings, hip flexors, pecs, lats, and spine to restore tissue length.',
        tips: [
          'Never bounce aggressively in static stretches; breathe into each stretch.',
          'Hold each stretch for 30-45 seconds at mild tension (not sharp pain).'
        ],
        instructions: [
          'World\'s greatest stretch (5 reps per side).',
          'Seated hamstring fold and butterfly groin stretch.',
          'Doorway pectoral stretch and child\'s pose lat opener.'
        ],
        benefits: 'Increases joint range of motion, alleviates muscular tightness, and promotes blood circulation.'
      },
      {
        id: 'yoga',
        name: 'Vinyasa Flow / Restorative Yoga',
        duration: '15 minutes',
        caloriesBurned: 55,
        description: 'Mindful sequence moving through Downward Dog, Cobra, Warrior II, and Pigeon Pose for deep hip and back relief.',
        tips: [
          'Coordinate every movement with your breath (inhale expand, exhale deepen).',
          'Listen to your body; use yoga blocks or pillow modifications if needed.'
        ],
        instructions: [
          'Flow through 5 Sun Salutations A.',
          'Hold Pigeon Pose for 90 seconds per side to release deep glute tension.',
          'End in Savasana (corpse pose) for 3 minutes of deep surrender.'
        ],
        benefits: 'Decompresses the spine, opens tight hips, enhances mental clarity, and balances posture.'
      },
      {
        id: 'walking',
        name: 'Nature Walk / Zone 1 Aerobic Flush',
        duration: '20-30 minutes',
        caloriesBurned: 110,
        description: 'Low-intensity outdoor walk in fresh air to clear metabolic waste products without inducing central fatigue.',
        tips: [
          'Keep heart rate low (Zone 1: conversational pace, around 100-115 bpm).',
          'Leave phone notifications on silent to maximize mental detachment.'
        ],
        instructions: [
          'Put on comfortable walking shoes.',
          'Walk at an easy, enjoyable pace through a park, trail, or neighborhood.',
          'Take full deep diaphragmatic breaths.'
        ],
        benefits: 'Accelerates lactic acid clearance, burns fat gently, and lowers resting cortisol levels.'
      },
      {
        id: 'foam-rolling',
        name: 'Self-Myofascial Release (Foam Rolling)',
        duration: '10 minutes',
        caloriesBurned: 30,
        description: 'Using a high-density foam roller to release muscular trigger points, knots, and tight fascia in quads, IT band, and upper back.',
        tips: [
          'Roll slowly (1 inch per second).',
          'When you find a tender knot, pause on it for 20-30 seconds until the tension melts.',
          'Never roll directly over bony joints or lower back lumbar vertebrae.'
        ],
        instructions: [
          'Roll upper thoracic back with arms hugged across chest.',
          'Roll quads from hip crease to 1 inch above knees.',
          'Roll glutes and IT bands with gentle supporting pressure.'
        ],
        benefits: 'Breaks up scar tissue, improves blood flow to sore muscles, and reduces DOMS soreness.'
      },
      {
        id: 'meditation',
        name: 'Box Breathing & Guided Mindfulness',
        duration: '10 minutes',
        caloriesBurned: 15,
        description: 'Dedicated breathwork to activate the parasympathetic nervous system (rest & digest) and optimize recovery sleep.',
        tips: [
          'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold empty for 4 seconds.',
          'Notice thoughts without judgment and return attention to the breath.'
        ],
        instructions: [
          'Sit comfortably with spine tall or lie flat on back.',
          'Close eyes, relax jaw and facial muscles.',
          'Engage in 10-15 cycles of box breathing.',
          'Finish with gratitude for your body\'s strength and progress.'
        ],
        benefits: 'Reduces systemic stress hormones, speeds up cellular repair, and improves sleep quality.'
      }
    ]
  }
};
