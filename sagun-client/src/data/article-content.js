import card1 from '../assets/card1.jpg';
import card2 from '../assets/card2.jpg';
import card3 from '../assets/card3.jpg';
import card4 from '../assets/card4.jpg';
import card5 from '../assets/card5.jpg';
import card6 from '../assets/card6.jpg';
import card7 from '../assets/card7.jpg';
import card8 from '../assets/card8.jpg';
import card9 from '../assets/card9.jpg';
import card10 from '../assets/card10.jpg';

const articles = [
    {
        name: "surviving-midterms",
        title: "Surviving Midterms Without Burning Out",
        content: [
            "Midterms can feel like everything happens at once: projects, quizzes, deadlines, and lack of sleep. The first step to surviving is to stop treating every task as equally urgent. Write down all your requirements, then mark what is due first and what has the highest grade impact.",
            "Use short focused study blocks instead of marathon sessions. Try 50 minutes of work, then a 10 minute break to stretch, hydrate, and reset your brain. This helps you retain information better and reduces the mental crash that comes from nonstop cramming.",
            "Protect your sleep as part of your study strategy. A tired brain reads twice and remembers half. Aim for consistent sleep hours, even during exam week, so your concentration and memory stay stable when you need them most.",
            "Finally, be realistic and kind to yourself. You do not need perfect scores in every subject to succeed. Progress, consistency, and recovery matter more than one intense all nighter.",
        ],
        image: card1
    },
    {
        name: "group-project-survival-guide",
        title: "Group Project Survival Guide for College Students",
        content: [
            "Group projects are difficult not because of the task, but because of coordination. Start by assigning clear roles based on strengths: researcher, writer, presenter, designer, or editor. Everyone should know exactly what they are responsible for.",
            "Set mini deadlines before the official deadline. Waiting until the last two days almost always creates panic and low quality output. A shared timeline with check in dates keeps the whole team moving at the same pace.",
            "Communicate in one official channel only, such as one group chat or one shared document comment thread. Splitting messages across apps causes missed updates and confusion. Keep decisions visible so no one is left behind.",
            "If someone is not contributing, address it early and professionally. Focus on the work, not personal attacks. Calm, clear communication protects the team and gives everyone a chance to improve before submission day.",
        ],
        image: card2
    },
    {
        name: "study-habits-that-actually-work",
        title: "Study Habits That Actually Work in Busy Semesters",
        content: [
            "Effective studying starts with planning your week before it starts. Reserve blocks for reading, assignments, and review so your workload feels predictable. A simple weekly plan removes the stress of deciding what to do every hour.",
            "Active recall is more powerful than passive reading. Instead of highlighting everything, close your notes and try explaining concepts out loud from memory. The harder it feels, the better your brain is training for exams.",
            "Mix subjects in one session when possible. Studying one subject for too long can make you mentally numb. Rotating topics keeps your attention fresh and helps you learn connections between ideas.",
            "Review old material regularly, not just before tests. Ten to fifteen minutes of spaced review each day prevents forgetting and makes exam preparation faster later.",
        ],
        image: card3
    },
    {
        name: "managing-screen-time-as-a-student",
        title: "Managing Screen Time Without Losing Productivity",
        content: [
            "Students use screens for almost everything, so the goal is not zero screen time. The real goal is intentional screen time. Start by separating academic apps from entertainment apps on your devices.",
            "Try app timers and focus modes during deep work periods. Even short distractions can break momentum and cost several minutes of concentration. Protecting focus improves both speed and quality of work.",
            "Take visual breaks every 20 minutes by looking away from your screen for at least 20 seconds. This reduces eye strain and headaches during long study sessions. Small habits like this improve endurance over the day.",
            "When possible, switch to offline tasks for part of your routine, such as handwritten summaries or printed reviewers. This gives your brain a break from constant notifications and helps with long term retention.",
        ],
        image: card4
    },
    {
        name: "budgeting-tips-for-college-life",
        title: "Simple Budgeting Tips for College Life",
        content: [
            "Budgeting as a student is less about strict rules and more about awareness. Track your spending for two weeks to see where your money really goes. Most students are surprised by how much small daily purchases add up.",
            "Use a simple 50-30-20 approach as a starting point: needs, wants, and savings. Your exact percentages can change depending on allowances and expenses, but the structure helps you avoid overspending.",
            "Plan meals and snacks before school days to reduce impulsive food purchases. Bringing even one packed meal a day can save a significant amount monthly. Savings from food are often the easiest to maintain.",
            "Set a weekly spending cap and review it every Sunday. Regular check ins help you adjust quickly before small mistakes become end of month problems.",
        ],
        image: card5
    },
    {
        name: "building-confidence-in-class",
        title: "Building Confidence in Class Participation",
        content: [
            "Many students stay silent in class because they fear saying the wrong answer. Confidence grows when you focus on contribution, not perfection. Asking a clear question is already valuable participation.",
            "Prepare one or two points before each class from your readings. Having something ready makes it easier to speak when discussion starts. Preparation turns anxiety into structure.",
            "Start small by participating once per session, then increase gradually. Confidence is built through repetition, not one big moment. Each small attempt teaches your brain that speaking up is safe.",
            "If public speaking feels overwhelming, practice your thoughts with a friend first. Rehearsal helps organize ideas and improves delivery, making classroom participation feel less intimidating.",
        ],
        image: card6
    },
    {
        name: "how-to-avoid-procrastination",
        title: "How to Avoid Procrastination During Finals Season",
        content: [
            "Procrastination often starts when a task feels too big or unclear. Break assignments into tiny next actions, such as opening the document, writing one heading, or solving two problems. Starting small removes mental resistance.",
            "Use a countdown start: choose a task, count down from five, and begin immediately. This interrupts overthinking and forces action before excuses grow. Momentum usually builds after the first few minutes.",
            "Create a distraction list while studying. When random thoughts appear, write them down and return to work. This prevents task switching while assuring your brain that nothing important will be forgotten.",
            "Reward completion with short meaningful breaks, not endless scrolling. A quick walk, snack, or playlist break helps recovery while keeping your day on track.",
        ],
        image: card7
    },
    {
        name: "healthy-routines-for-night-owls",
        title: "Healthy Routines for Students Who Study at Night",
        content: [
            "Not everyone studies best in the morning, and that is okay. If you are a night owl, build a routine that supports energy and health instead of fighting your natural rhythm completely. Consistency still matters more than timing.",
            "Set a fixed study start and end time each night. Without boundaries, night study can drift into unhealthy all nighters. A stable schedule improves both productivity and recovery.",
            "Keep caffeine controlled after evening hours and drink more water during sessions. Too much caffeine late at night can reduce sleep quality even if you fall asleep quickly. Better hydration helps focus without the crash.",
            "Create a short wind down ritual after studying, such as dimming lights and avoiding phone use for 20 minutes. This signals your body to shift from alert mode to rest mode.",
        ],
        image: card8
    },
    {
        name: "presentation-day-checklist",
        title: "Presentation Day Checklist for Less Stress",
        content: [
            "Presentation stress is normal, but preparation can lower it significantly. Review your slides the day before and make sure each slide supports one clear point. Simplicity makes delivery easier and more convincing.",
            "Practice out loud at least twice, preferably with a timer. Silent reading is not the same as speaking in front of people. Timing helps you adjust pacing and avoid rushing the ending.",
            "Prepare backup plans such as offline files, screenshots, or printed notes in case technology fails. Confidence increases when you know a technical problem will not ruin your presentation.",
            "Before presenting, focus on your breathing for one minute and speak slower than your nerves suggest. A calm pace improves clarity and helps your audience follow your message.",
        ],
        image: card9
    },
    {
        name: "staying-motivated-after-failure",
        title: "Staying Motivated After a Bad Exam Score",
        content: [
            "A bad score can feel personal, but it is data, not destiny. Separate your identity from one result and analyze what happened: lack of preparation, weak understanding, or exam anxiety. Clear diagnosis leads to better decisions.",
            "Meet your instructor or review the test to identify specific mistakes. General frustration does not improve performance, but specific feedback does. Knowing your weak areas gives you a roadmap for the next assessment.",
            "Adjust your strategy, not just your effort. If rereading notes did not work, switch to problem solving, flashcards, or peer teaching. Better methods often matter more than longer hours.",
            "Keep moving with realistic goals for the next two weeks. Small wins rebuild confidence faster than waiting for one perfect comeback moment.",
        ],
        image: card10
    }
];

export default articles;