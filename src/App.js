// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css';

// Main App Component

// Main App Component
function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Tough Mudder 15k Team Journey</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/weeks">Training Weeks</Link>
            <Link to="/tips">Race Tips</Link>
          </nav>
        </header>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weeks" element={<WeeksList />} />
            <Route path="/weeks/:weekNum" element={<WeekDetail />} />
            <Route path="/workout/:weekNum/:workoutNum" element={<WorkoutDetail />} />
            <Route path="/tips" element={<Tips />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>Tough Mudder 15k Training Plan - West London</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

// Home Component
function Home() {
  return (
    <div className="home">
      <h2>5-Week Tough Mudder Training Plan</h2>
      <div className="intro-card">
        <h3>Let's Have Fun in the Mud Together!</h3>
        <p>Welcome to your friendly 5-week training plan for our upcoming Tough Mudder adventure! This isn't about racing or competing - it's about having fun, supporting each other, and enjoying the experience together as a team.</p>
        
        <h3>What We'll Experience Together:</h3>
        <ul>
          <li>A beautiful 15km (9.3 miles) journey with plenty of laughs along the way</li>
          <li>20+ teamwork-based obstacles where we'll help each other shine</li>
          <li>Mud, water, and memories that will last a lifetime</li>
          <li>3.5-4 hours of team bonding and fun challenges</li>
        </ul>
        
        <h3>How to Use This Friendly Plan:</h3>
        <ul>
          <li>Aim for 3 enjoyable workouts each week - any days that work for you!</li>
          <li>Modify everything to your comfort level - this is about feeling good</li>
          <li>Track your progress at your own pace - celebrate small wins!</li>
          <li>Focus on having fun and staying safe rather than pushing too hard</li>
          <li>Rest plenty between sessions - recovery is where the magic happens</li>
        </ul>
        
        <h3>Remember:</h3>
        <p>This event is all about teamwork and having fun together! We'll be moving at a comfortable pace, taking breaks when needed, and supporting each other through every obstacle. No one gets left behind!</p>
        
        <div className="action-buttons">
          <Link to="/weeks" className="button primary">Start Our Journey</Link>
          <Link to="/tips" className="button secondary">Helpful Tips</Link>
        </div>
      </div>
    </div>
  );
}

// Weeks List Component
function WeeksList() {
  return (
    <div className="weeks-list">
      <h2>Our Team Journey</h2>
      <p className="weeks-intro">Each week builds on the last, but remember - this is about having fun and supporting each other, not about pushing to exhaustion. Go at your own pace!</p>
      <div className="weeks-grid">
        {[1, 2, 3, 4, 5].map(weekNum => (
          <WeekCard key={weekNum} weekNum={weekNum} />
        ))}
      </div>
    </div>
  );
}

// Week Card Component
function WeekCard({ weekNum }) {
  const themes = {
    1: { title: "Foundation Building", color: "#4CAF50" },
    2: { title: "Building Intensity", color: "#2196F3" },
    3: { title: "Endurance Focus", color: "#FF9800" },
    4: { title: "Peak Training", color: "#E91E63" },
    5: { title: "Taper and Prepare", color: "#9C27B0" }
  };
  
  const [progress, setProgress] = useState({ workouts: [0, 0, 0], total: 0 });
  
  useEffect(() => {
    const savedProgress = localStorage.getItem(`week${weekNum}Progress`);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, [weekNum]);
  
  const theme = themes[weekNum];
  
  return (
    <Link to={`/weeks/${weekNum}`} className="week-card" style={{ borderColor: theme.color }}>
      <div className="week-header" style={{ backgroundColor: theme.color }}>
        <h3>Week {weekNum}</h3>
      </div>
      <div className="week-content">
        <h4>{theme.title}</h4>
        <div className="week-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress.total}%`, backgroundColor: theme.color }}
            ></div>
          </div>
          <span>{progress.total}% Complete</span>
        </div>
      </div>
    </Link>
  );
}

// Week Detail Component
function WeekDetail() {
  const { weekNum } = useParams();
  const weekInt = parseInt(weekNum);
  const navigate = useNavigate();
  
  const themes = {
    1: { title: "Foundation Building", color: "#4CAF50" },
    2: { title: "Building Intensity", color: "#2196F3" },
    3: { title: "Endurance Focus", color: "#FF9800" },
    4: { title: "Peak Training", color: "#E91E63" },
    5: { title: "Taper and Prepare", color: "#9C27B0" }
  };
  
  const theme = themes[weekInt];
  
  const [progress, setProgress] = useState({ workouts: [0, 0, 0], total: 0 });
  
  useEffect(() => {
    const savedProgress = localStorage.getItem(`week${weekInt}Progress`);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, [weekInt]);
  
  const workoutTitles = {
    1: ["Endurance Base", "Strength Foundation", "Obstacle Skills"],
    2: ["Endurance Progression", "Strength Progression", "Obstacle Challenge"],
    3: ["Distance Builder", "Functional Strength", "Tough Mudder Simulation"],
    4: ["Distance and Intensity", "Obstacle Strength", "Mini Tough Mudder"],
    5: ["Maintenance Run", "Obstacle Technique", "Final Prep"]
  };
  
  return (
    <div className="week-detail">
      <div className="navigation-controls">
        {weekInt > 1 && (
          <button className="nav-button" onClick={() => navigate(`/weeks/${weekInt - 1}`)}>
            ← Previous Week
          </button>
        )}
        <button className="nav-button" onClick={() => navigate('/weeks')}>
          All Weeks
        </button>
        {weekInt < 5 && (
          <button className="nav-button" onClick={() => navigate(`/weeks/${weekInt + 1}`)}>
            Next Week →
          </button>
        )}
      </div>
      
      <h2 style={{ color: theme.color }}>Week {weekNum}: {theme.title}</h2>
      
      <div className="week-overview">
        <div className="progress-summary">
          <h3>Week Progress</h3>
          <div className="progress-bar large">
            <div 
              className="progress-fill" 
              style={{ width: `${progress.total}%`, backgroundColor: theme.color }}
            ></div>
          </div>
          <span>{progress.total}% Complete</span>
        </div>
      </div>
      
      <div className="workouts-list">
        <h3>Workouts This Week</h3>
        {[1, 2, 3].map(workoutNum => {
          const workoutProgress = progress.workouts[workoutNum - 1];
          
          return (
            <Link 
              key={workoutNum} 
              to={`/workout/${weekInt}/${workoutNum}`} 
              className="workout-card"
            >
              <div className="workout-header" style={{ backgroundColor: theme.color }}>
                <h4>Workout {workoutNum}</h4>
                <span className={`status ${workoutProgress === 100 ? 'complete' : 'incomplete'}`}>
                  {workoutProgress === 100 ? 'Completed' : 'Incomplete'}
                </span>
              </div>
              <div className="workout-content">
                <h4>{workoutTitles[weekInt][workoutNum - 1]}</h4>
                <div className="workout-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${workoutProgress}%`, backgroundColor: theme.color }}
                    ></div>
                  </div>
                  <span>{workoutProgress}%</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Tips Component
function Tips() {
  return (
    <div className="tips-page">
      <h2>Race Week Tips</h2>
      
      <div className="tips-section">
        <h3>Nutrition</h3>
        <ul>
          <li>Increase carbohydrate intake 2-3 days before the event</li>
          <li>Stay well hydrated throughout the week</li>
          <li>Avoid trying new foods right before the race</li>
          <li>Eat a familiar, carb-rich meal 2-3 hours before the event</li>
        </ul>
      </div>
      
      <div className="tips-section">
        <h3>Gear</h3>
        <ul>
          <li>Break in any new shoes well before race day</li>
          <li>Plan to wear moisture-wicking, quick-drying clothes</li>
          <li>Consider wearing compression gear to protect skin</li>
          <li>Bring a change of clothes for after the event</li>
        </ul>
      </div>
      
      <div className="tips-section">
        <h3>Recovery</h3>
        <ul>
          <li>Get plenty of sleep the week before the event</li>
          <li>Plan rest days 1-2 days before the event</li>
          <li>Prepare recovery nutrition for immediately after the event</li>
          <li>Consider bringing a towel and baby wipes for post-race cleanup</li>
        </ul>
      </div>
      
      <div className="tips-section">
        <h3>Teamwork</h3>
        <ul>
          <li>Discuss team strategy before the event</li>
          <li>Plan how you'll help each other on team obstacles</li>
          <li>Set a sustainable pace that works for everyone</li>
          <li>Remember, it's about finishing together and having fun!</li>
        </ul>
      </div>
      
      <div className="tips-section">
        <h3>Obstacle-Specific Tips</h3>
        
        <div className="obstacle-tip">
          <h4>Climbing Walls</h4>
          <ul>
            <li>Use proper technique: power from legs, not arms</li>
            <li>For teamwork walls, create a human pyramid or give teammates a boost</li>
            <li>Practice proper landing technique to protect joints</li>
          </ul>
        </div>
        
        <div className="obstacle-tip">
          <h4>Monkey Bars/Hanging Obstacles</h4>
          <ul>
            <li>Conserve grip strength by moving quickly</li>
            <li>Keep body tension through your core</li>
            <li>Look ahead to your next grip point, not straight down</li>
          </ul>
        </div>
        
        <div className="obstacle-tip">
          <h4>Mud Crawls</h4>
          <ul>
            <li>Keep your head up and body low</li>
            <li>Use your forearms and toes to propel forward</li>
            <li>Protect your face and eyes from mud</li>
          </ul>
        </div>
        
        <div className="obstacle-tip">
          <h4>Water Obstacles</h4>
          <ul>
            <li>Don't panic if submerged</li>
            <li>Exhale slowly underwater if necessary</li>
            <li>Remember that many water obstacles can be bypassed if you're uncomfortable</li>
          </ul>
        </div>
        
        <div className="obstacle-tip">
          <h4>Carry Obstacles</h4>
          <ul>
            <li>Use proper lifting technique (lift with legs, not back)</li>
            <li>Switch carrying positions or shoulders when fatigued</li>
            <li>Take brief breaks if needed</li>
          </ul>
        </div>
      </div>
      
      <div className="final-thoughts">
        <h3>Final Encouraging Thoughts</h3>
        <p>Remember that Tough Mudder is about having a great time and supporting each other as a team! There's no pressure to race through - we'll take our time, help each other over every wall, and share plenty of laughs (and mud) along the way.</p>
        <p>This preparation journey is about building confidence together, not pushing ourselves to exhaustion. Every bit of training you do is a win, and we'll celebrate all progress, big or small!</p>
        <p>We're going to have an amazing day out, create unforgettable memories, and cross that finish line together with smiles on our muddy faces!</p>
      </div>
    </div>
  );
}

// Exercise Timer Component
function ExerciseTimer({ exerciseText }) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [originalTime, setOriginalTime] = useState(0);
  
  // Extract time from exercise text
  const extractTime = () => {
    // Look for time patterns like "30 seconds", "45 sec", "2 minutes", "2 min"
    const secondsMatch = exerciseText.match(/(\d+)\s*(?:seconds|secs?)/i);
    const minutesMatch = exerciseText.match(/(\d+)\s*(?:minutes|mins?)/i);
    
    let totalSeconds = 0;
    
    if (secondsMatch) {
      totalSeconds += parseInt(secondsMatch[1], 10);
    }
    
    if (minutesMatch) {
      totalSeconds += parseInt(minutesMatch[1], 10) * 60;
    }
    
    // Default to 30 seconds if no time found
    return totalSeconds > 0 ? totalSeconds : 30;
  };
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    const time = extractTime();
    setTimeLeft(time);
    setOriginalTime(time);
  }, [exerciseText]);
  
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      // Play sound when timer completes
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);
  
  const startStopTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(originalTime);
  };
  
  const progress = (timeLeft / originalTime) * 100;
  
  return (
    <div className="exercise-timer">
      <div className="timer-display">
        <div className="timer-progress" style={{ width: `${progress}%` }}></div>
        <span className="timer-time">{formatTime(timeLeft)}</span>
      </div>
      <div className="timer-controls">
        <button 
          className="timer-button" 
          onClick={startStopTimer}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button 
          className="timer-button" 
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Workout Detail Component
function WorkoutDetail() {
  const { weekNum, workoutNum } = useParams();
  const weekInt = parseInt(weekNum);
  const workoutInt = parseInt(workoutNum);
  const navigate = useNavigate();
  
  const themes = {
    1: { title: "Foundation Building", color: "#4CAF50" },
    2: { title: "Building Intensity", color: "#2196F3" },
    3: { title: "Endurance Focus", color: "#FF9800" },
    4: { title: "Peak Training", color: "#E91E63" },
    5: { title: "Taper and Prepare", color: "#9C27B0" }
  };
  
  const theme = themes[weekInt];
  
  const workoutTitles = {
    1: ["Endurance Base", "Strength Foundation", "Obstacle Skills"],
    2: ["Endurance Progression", "Strength Progression", "Obstacle Challenge"],
    3: ["Distance Builder", "Functional Strength", "Tough Mudder Simulation"],
    4: ["Distance and Intensity", "Obstacle Strength", "Mini Tough Mudder"],
    5: ["Maintenance Run", "Obstacle Technique", "Final Prep"]
  };
  
  const workouts = {
    1: {
      1: {
        focus: "Building cardiovascular endurance",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light jog or brisk walk (5 minutes)",
              "Dynamic stretches: arm circles, leg swings, hip rotations (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Interval Run/Walk: 20-25 minutes total\n- Run 3 minutes, walk 2 minutes\n- Repeat 4-5 times\n- For more advanced: Run 4 minutes, walk 1 minute",
              "Circuit (2 rounds, 30 seconds each exercise, 15 seconds rest):\n- Bodyweight squats\n- Push-ups (modify on knees if needed)\n- Mountain climbers\n- Plank hold"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Walk (5 minutes)",
              "Static stretches focusing on legs and lower back (5 minutes)"
            ]
          }
        ]
      },
      2: {
        focus: "Building basic strength needed for obstacles",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Jump rope or jumping jacks (3 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Lower Body (3 sets, 12-15 reps each):\n- Bodyweight squats\n- Alternating lunges\n- Glute bridges",
              "Upper Body (3 sets, 8-12 reps each):\n- Push-ups (modify as needed)\n- Inverted rows (using a table or desk)\n- Tricep dips (using a chair or bench)",
              "Core (3 sets):\n- Plank (30 seconds)\n- Bird dogs (10 each side)\n- Russian twists (20 total)"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Full body stretching routine (5-10 minutes)"
            ]
          }
        ]
      },
      3: {
        focus: "Developing specific skills for obstacles",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light jog (3 minutes)",
              "Dynamic movements (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Grip Strength (3 sets):\n- Dead hangs from a bar/tree branch (20-30 seconds)\n- Farmer's walks with heavy objects (30 seconds)",
              "Crawling & Mobility (3 sets):\n- Bear crawls (30 feet forward, 30 feet backward)\n- Crab walks (30 feet)\n- Army crawls (30 feet)",
              "Functional Movement (3 sets, 12 reps each):\n- Squat jumps\n- Burpees\n- Step-ups onto a chair or bench",
              "Run/Walk Cooldown:\n- 10-15 minute easy jog or fast walk"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Full body stretching (5-10 minutes)"
            ]
          }
        ]
      }
    },
    2: {
      1: {
        focus: "Increasing running endurance",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light jog or brisk walk (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Interval Training: 25-30 minutes total\n- Run 4 minutes, walk 1 minute\n- Repeat 5-6 times\n- For more advanced: Run 5 minutes, walk 1 minute",
              "Circuit (3 rounds, 40 seconds each exercise, 15 seconds rest):\n- Bodyweight squats\n- Push-ups\n- High knees\n- Plank shoulder taps\n- Alternating reverse lunges"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Walk (5 minutes)",
              "Static stretches (5 minutes)"
            ]
          }
        ]
      },
      2: {
        focus: "Building functional strength",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Jump rope or jumping jacks (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Lower Body (3 sets, 15 reps each):\n- Walking lunges\n- Jump squats (or air squats for modifications)\n- Single-leg glute bridges (each side)",
              "Upper Body (3 sets):\n- Push-ups (10-15 reps)\n- Inverted rows (10-12 reps)\n- Plank up-downs (10 reps)",
              "Core Circuit (3 rounds, 30 seconds each, 15 seconds rest):\n- Plank\n- Mountain climbers\n- Bicycle crunches\n- Side plank (each side)"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Full body stretching routine (5-10 minutes)"
            ]
          }
        ]
      },
      3: {
        focus: "Simulating obstacle course challenges",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light jog (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Mini Obstacle Course (4 rounds, minimal rest between exercises):\n- 10 burpees\n- Bear crawl 40 feet\n- 15 squat jumps\n- Crab walk 40 feet\n- 10 push-ups\n- 30-second plank hold",
              "Grip & Upper Body (3 sets):\n- Dead hangs (30-45 seconds)\n- Negative pull-ups or assisted pull-ups (5-8 reps)",
              "Run/Walk Intervals:\n- 2-minute run, 1-minute walk\n- Repeat for 15 minutes"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Light walking (5 minutes)",
              "Full body stretch (5-10 minutes)"
            ]
          }
        ]
      }
    },
    3: {
      1: {
        focus: "Building running endurance",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light jog (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Endurance Run:\n- 30-40 minute continuous run at a comfortable pace\n- If needed: Run 8 minutes, walk 2 minutes for the duration\n- Focus on steady pace rather than speed",
              "Post-Run Strength (2 rounds, 30 seconds each, minimal rest):\n- Bodyweight squats\n- Push-ups\n- Alternating lunges\n- Plank"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Walk (5 minutes)",
              "Static stretches focusing on legs (5 minutes)"
            ]
          }
        ]
      },
      2: {
        focus: "Obstacle-specific strength training",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Jumping jacks or jump rope (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Lower Body (4 sets, 12-15 reps each):\n- Bulgarian split squats (each leg)\n- Lateral lunges\n- Box/bench step-ups with height",
              "Upper Body (4 sets):\n- Push-up variations (standard, wide, diamond) (10-12 reps)\n- Inverted rows (10-12 reps)\n- Pike push-ups (8-10 reps)",
              "Core (3 sets):\n- Plank with shoulder taps (45 seconds)\n- Hollow body hold (30 seconds)\n- Superman holds (30 seconds)",
              "Finisher:\n- 3 rounds of 10 burpees with minimal rest"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Full body stretching routine (5-10 minutes)"
            ]
          }
        ]
      },
      3: {
        focus: "Combining running with obstacle simulation",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light jog (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Run-Obstacle Intervals:\n- Run 3 minutes at moderate pace\n- Perform one obstacle exercise for 1 minute\n- Repeat for 30 minutes total\n\nObstacle Exercises (rotate through):\n- Bear crawls\n- Burpees\n- Walking lunges\n- Army crawls\n- Wall climbs (simulate by doing step-ups onto a high surface)\n- Farmer's carries with heavy objects",
              "Team Simulation (if possible, otherwise do solo):\n- Carry a heavy object (backpack, dumbbell) for 2-3 minutes\n- Switch to a different movement pattern (like lateral shuffles) for 1 minute\n- Repeat for 10-15 minutes"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Walk (5 minutes)",
              "Full body stretch (5-10 minutes)"
            ]
          }
        ]
      }
    },
    4: {
      1: {
        focus: "Simulating race conditions",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light jog (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Interval Progression:\n- 5 minute run at moderate pace\n- 1 minute hard effort\n- 1 minute walk\n- Repeat 6-8 times",
              "Strength Endurance (3 rounds, 45 seconds each, 15 seconds rest):\n- Jump squats\n- Push-ups\n- Mountain climbers\n- Reverse lunges\n- Plank"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Walk (5 minutes)",
              "Static stretches (5-10 minutes)"
            ]
          }
        ]
      },
      2: {
        focus: "Peak strength training for obstacles",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Jumping jacks or jump rope (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Lower Body (4 sets, 12-15 reps each):\n- Jumping lunges (or walking lunges for modification)\n- Squat jumps\n- Step-ups with knee drive",
              "Upper Body Pull Focus (4 sets):\n- Pull-ups or negative pull-ups (5-8 reps)\n- Inverted rows (12-15 reps)\n- Dead hangs with leg raises (8-10 reps)",
              "Upper Body Push Focus (4 sets):\n- Push-ups (max reps)\n- Dips (10-12 reps)\n- Plank up-downs (10-12 reps)",
              "Core (3 sets):\n- Hanging knee raises or lying leg raises (12-15 reps)\n- Russian twists with weight (20 total)\n- Plank with alternating knee to elbow (20 total)",
              "Finisher:\n- 50 burpees for time (break into sets as needed)"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Full body stretching routine (5-10 minutes)"
            ]
          }
        ]
      },
      3: {
        focus: "Race simulation",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light jog (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Endurance Base:\n- 20-minute run at comfortable pace",
              "Obstacle Course Simulation (3-4 rounds with minimal rest):\n- 10 burpees (wall obstacles)\n- Bear crawl 50 feet (barbed wire crawl)\n- 15 push-ups (upper body obstacles)\n- Farmer's walk with heavy objects for 50 feet (carry obstacles)\n- 20 squat jumps (mud hills)\n- 45-second dead hang (monkey bars)\n- 15 box/bench jumps or step-ups (wall climbs)",
              "Endurance Finish:\n- 10-15 minute run at comfortable pace"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Walk (5 minutes)",
              "Full body stretch (10 minutes)"
            ]
          }
        ]
      }
    },
    5: {
      1: {
        focus: "Maintaining fitness while beginning to taper",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light jog (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Moderate Endurance Run:\n- 20-30 minute run at comfortable pace\n- Focus on consistent effort, not speed",
              "Light Strength Circuit (2 rounds, 30 seconds each, 15 seconds rest):\n- Bodyweight squats\n- Push-ups\n- Mountain climbers\n- Plank"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Walk (5 minutes)",
              "Static stretches (5-10 minutes)"
            ]
          }
        ]
      },
      2: {
        focus: "Technique refinement, not intensity",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light cardio (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Technique Practice (focus on form, not fatigue):\n- Proper burpee technique (3 sets of 5 with perfect form)\n- Bear crawls with focus on shoulder stability (3 sets of 30 feet)\n- Push-up technique (3 sets of 5-8 with perfect form)\n- Proper squat technique (3 sets of 10 with perfect form)",
              "Grip Endurance (3 sets):\n- Dead hangs (30 seconds)\n- Farmer's walks (30 seconds)",
              "Light Core Work (2 sets):\n- Plank (30 seconds)\n- Bird dogs (10 each side)\n- Glute bridges (15 reps)"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Full body stretching routine (5-10 minutes)"
            ]
          }
        ]
      },
      3: {
        focus: "Light activity and mental preparation",
        sections: [
          {
            title: "Warm-up (5-10 minutes)",
            exercises: [
              "Light jog or brisk walk (5 minutes)",
              "Dynamic stretches (5 minutes)"
            ]
          },
          {
            title: "Main Workout",
            exercises: [
              "Light Cardio:\n- 15-minute easy jog or brisk walk",
              "Movement Prep (1-2 rounds, focus on mobility):\n- 10 bodyweight squats\n- 10 walking lunges (each leg)\n- 10 arm circles (each direction)\n- 5-10 push-ups\n- 30-second plank",
              "Mental Preparation:\n- Visualize completing obstacles successfully\n- Review course map if available\n- Develop a race strategy with teammates"
            ]
          },
          {
            title: "Cool Down",
            exercises: [
              "Light walking (5 minutes)",
              "Full body stretch with focus on relaxation (10 minutes)"
            ]
          }
        ]
      }
    }
  };
  
  const currentWorkout = workouts[weekInt][workoutInt];
  
  const [checkedExercises, setCheckedExercises] = useState({});
  
  useEffect(() => {
    const savedCheckedExercises = localStorage.getItem(`week${weekInt}workout${workoutInt}Exercises`);
    if (savedCheckedExercises) {
      setCheckedExercises(JSON.parse(savedCheckedExercises));
    }
  }, [weekInt, workoutInt]);
  
  const handleCheckExercise = (sectionIndex, exerciseIndex) => {
    const exerciseKey = `s${sectionIndex}e${exerciseIndex}`;
    const newCheckedExercises = {
      ...checkedExercises,
      [exerciseKey]: !checkedExercises[exerciseKey]
    };
    
    setCheckedExercises(newCheckedExercises);
    localStorage.setItem(`week${weekInt}workout${workoutInt}Exercises`, JSON.stringify(newCheckedExercises));
    
    updateProgress(newCheckedExercises);
  };
  
  const updateProgress = (newCheckedExercises) => {
    // Count main exercises
    const mainExerciseCount = currentWorkout.sections.reduce((total, section) => total + section.exercises.length, 0);
    
    // Count sub-exercises
    let subExerciseCount = 0;
    currentWorkout.sections.forEach((section, sectionIndex) => {
      section.exercises.forEach((exercise, exerciseIndex) => {
        const subExercises = exercise.split('\n').slice(1).filter(line => line.trim() && line.trim() !== '-');
        subExerciseCount += subExercises.length;
      });
    });
    
    // Total exercises (main + sub)
    const totalExercises = mainExerciseCount + subExerciseCount;
    
    // Count completed exercises
    const checkedCount = Object.keys(newCheckedExercises).filter(key => newCheckedExercises[key]).length;
    
    // Calculate percentage
    const percent = totalExercises > 0 ? Math.round((checkedCount / totalExercises) * 100) : 0;
    
    // Save progress for the workout
    const savedProgress = JSON.parse(localStorage.getItem(`week${weekInt}Progress`) || '{"workouts":[0,0,0],"total":0}');
    savedProgress.workouts[workoutInt - 1] = percent;
    
    // Calculate total week progress
    const totalWeekProgress = Math.round(savedProgress.workouts.reduce((sum, value) => sum + value, 0) / 3);
    savedProgress.total = totalWeekProgress;
    
    localStorage.setItem(`week${weekInt}Progress`, JSON.stringify(savedProgress));
  };
  
  const calculateProgress = () => {
    // Count main exercises
    const mainExerciseCount = currentWorkout.sections.reduce((total, section) => total + section.exercises.length, 0);
    
    // Count sub-exercises
    let subExerciseCount = 0;
    currentWorkout.sections.forEach((section, sectionIndex) => {
      section.exercises.forEach((exercise, exerciseIndex) => {
        const subExercises = exercise.split('\n').slice(1).filter(line => line.trim() && line.trim() !== '-');
        subExerciseCount += subExercises.length;
      });
    });
    
    // Total exercises (main + sub)
    const totalExercises = mainExerciseCount + subExerciseCount;
    
    // Count completed exercises
    const checkedCount = Object.keys(checkedExercises).filter(key => checkedExercises[key]).length;
    
    // Calculate percentage
    return totalExercises > 0 ? Math.round((checkedCount / totalExercises) * 100) : 0;
  };
  
  return (
    <div className="workout-detail">
      <div className="navigation-controls">
        <button className="nav-button" onClick={() => navigate(`/weeks/${weekInt}`)}>
          Back to Week {weekInt}
        </button>
        {workoutInt > 1 && (
          <button className="nav-button" onClick={() => navigate(`/workout/${weekInt}/${workoutInt - 1}`)}>
            ← Previous Workout
          </button>
        )}
        {workoutInt < 3 && (
          <button className="nav-button" onClick={() => navigate(`/workout/${weekInt}/${workoutInt + 1}`)}>
            Next Workout →
          </button>
        )}
      </div>
      
      <h2 style={{ color: theme.color }}>
        Week {weekInt} - Workout {workoutInt}: {workoutTitles[weekInt][workoutInt - 1]}
      </h2>
      
      <div className="workout-overview">
        <p className="workout-focus"><strong>Focus:</strong> {currentWorkout.focus}</p>
        
        <div className="progress-summary">
          <h3>Workout Progress</h3>
          <div className="progress-bar large">
            <div 
              className="progress-fill" 
              style={{ width: `${calculateProgress()}%`, backgroundColor: theme.color }}
            ></div>
          </div>
          <span>{calculateProgress()}% Complete</span>
        </div>
      </div>
      
      <div className="workout-sections">
        {currentWorkout.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="workout-section">
            <h3>{section.title}</h3>
            <div className="exercise-list">
              {section.exercises.map((exercise, exerciseIndex) => {
                const exerciseKey = `s${sectionIndex}e${exerciseIndex}`;
                
                // Process exercise text to separate main exercise from sub-exercises
                const lines = exercise.split('\n');
                const mainExercise = lines[0];
                const subExercises = lines.slice(1);
                
                // Check if this is a timed exercise
                const hasTimer = mainExercise.includes('seconds') || 
                                 mainExercise.includes('minutes') ||
                                 subExercises.some(line => 
                                   line.includes('seconds') || 
                                   line.includes('minutes') || 
                                   line.includes(' sec') || 
                                   line.includes(' min'));
                
                return (
                  <div 
                    key={exerciseIndex} 
                    className={`exercise-item ${checkedExercises[exerciseKey] ? 'checked' : ''}`}
                  >
                    <div className="exercise-main-container">
                      <label className="exercise-label">
                        <input 
                          type="checkbox" 
                          checked={!!checkedExercises[exerciseKey]} 
                          onChange={() => handleCheckExercise(sectionIndex, exerciseIndex)}
                        />
                        <div className="exercise-text">
                          <p className="exercise-main">{mainExercise}</p>
                        </div>
                      </label>
                      
                      {hasTimer && (
                        <ExerciseTimer exerciseText={exercise} />
                      )}
                    </div>
                    
                    {subExercises.length > 0 && (
                      <div className="sub-exercises">
                        {subExercises.map((subExercise, subIndex) => {
                          // Generate a unique key for this sub-exercise
                          const subExerciseKey = `s${sectionIndex}e${exerciseIndex}sub${subIndex}`;
                          
                          // Skip empty lines or those that are just bullet points
                          if (!subExercise.trim() || subExercise.trim() === '-') {
                            return null;
                          }
                          
                          return (
                            <div key={subIndex} className="sub-exercise-item">
                              <label className="sub-exercise-label">
                                <input 
                                  type="checkbox" 
                                  checked={!!checkedExercises[subExerciseKey]} 
                                  onChange={() => {
                                    const newCheckedExercises = {
                                      ...checkedExercises,
                                      [subExerciseKey]: !checkedExercises[subExerciseKey]
                                    };
                                    setCheckedExercises(newCheckedExercises);
                                    localStorage.setItem(
                                      `week${weekInt}workout${workoutInt}Exercises`, 
                                      JSON.stringify(newCheckedExercises)
                                    );
                                  }}
                                />
                                <span className="sub-exercise-text">{subExercise}</span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="complete-workout">
        <button 
          className="button primary" 
          style={{ backgroundColor: calculateProgress() === 100 ? theme.color : '#ccc' }}
          onClick={() => {
            if (calculateProgress() === 100) {
              navigate(`/weeks/${weekInt}`);
            }
          }}
        >
          {calculateProgress() === 100 ? 'Awesome Job! Workout Complete! 🎉' : 'Keep Going - You Got This!'}
        </button>
        
        <p className="workout-encouragement">
          Remember: Any movement is better than none! Modify exercises as needed and celebrate your progress.
        </p>
      </div>
    </div>
  );
}
