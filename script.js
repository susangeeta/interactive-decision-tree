let currentStepIndex = 1;
const totalSteps = 3;

function goToNextStep(stepId) {
  let totalSteps = 3;
  let currentStep = parseInt(stepId.replace("step", ""));
  let progressWidth = (currentStep / totalSteps) * 100;
  document.querySelector(".progress").style.width = progressWidth + "%";

  document.getElementById(stepId).classList.remove("hidden");
  document.getElementById("step" + (currentStep - 1)).classList.add("hidden");
}

function goToPreviousStep(previousStepId) {
  const currentStep = document.querySelector(".form-step:not(.hidden)");

  currentStep.classList.add("hidden");
  document.getElementById(previousStepId).classList.remove("hidden");

  currentStepIndex--;
  updateProgressBar();
}

function generateRecommendation() {
  const preference = document.getElementById("preference").value;
  const activity = document.getElementById("activity").value;
  const budget = document.getElementById("budget").value;

  if (!preference || !activity || !budget) {
    alert("Please complete all selections.");
    return;
  }

  const recommendations = {
    beach: {
      adventure: {
        low: "Go to Goa, India for budget-friendly beach adventures!",
        medium:
          "Explore Bali, Indonesia for thrilling activities and relaxation!",
        high: "Maldives offers luxury beach adventures!",
      },
      relaxation: {
        low: "Visit a peaceful coastal town nearby.",
        medium: "Relax in the Maldives with mid-range accommodations.",
        high: "Enjoy luxury resorts in Seychelles.",
      },
    },
    mountains: {
      adventure: {
        low: "Trek the Himalayas on a budget-friendly trip!",
        medium: "Explore the Rocky Mountains with comfort.",
        high: "Enjoy adventure sports in the Swiss Alps.",
      },
      relaxation: {
        low: "Visit a serene mountain village.",
        medium: "Relax in a cozy cabin in the Alps.",
        high: "Stay in a luxury mountain resort in Aspen.",
      },
    },
  };

  const recommendation =
    recommendations[preference]?.[activity]?.[budget] ||
    "We couldn't find a match for your preferences.";

  document.getElementById("result").textContent = recommendation;
  document.querySelector(".form-step:not(.hidden)").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  updateProgressBar(true); // Progress bar is full on completion
}

function updateProgressBar(isFinalStep = false) {
  const progressPercentage = isFinalStep
    ? 100
    : (currentStepIndex / totalSteps) * 100;

  const progress = document.querySelector(".progress");
  progress.style.width = `${progressPercentage}%`;

  if (progressPercentage === 100) {
    progress.classList.add("completed");
  }

  const progressBar = document.querySelector(".progress-bar");
  progressBar.setAttribute("aria-valuenow", progressPercentage);
}
