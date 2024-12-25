let currentStepIndex = 1; // Start at the first step
const totalSteps = 3; // Total number of steps

// Go to the next step
function goToNextStep(nextStepId) {
  const currentStep = document.querySelector(".form-step:not(.hidden)");
  const selectElement = currentStep.querySelector("select");

  // Validate the current step's selection
  if (selectElement && !selectElement.value) {
    alert("Please select an option to proceed.");
    return;
  }

  // Hide the current step and show the next step
  currentStep.classList.add("hidden");
  document.getElementById(nextStepId).classList.remove("hidden");

  currentStepIndex++;
  updateProgressBar();
}

// Go to the previous step
function goToPreviousStep(previousStepId) {
  const currentStep = document.querySelector(".form-step:not(.hidden)");

  // Hide the current step and show the previous step
  currentStep.classList.add("hidden");
  document.getElementById(previousStepId).classList.remove("hidden");

  currentStepIndex--;
  updateProgressBar();
}

// Generate recommendation based on user selections
function generateRecommendation() {
  const preference = document.getElementById("preference").value;
  const activity = document.getElementById("activity").value;
  const budget = document.getElementById("budget").value;

  // Validate that all selections are complete
  if (!preference || !activity || !budget) {
    alert("Please complete all selections.");
    return;
  }

  // Recommendation logic
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

  // Display the recommendation
  document.getElementById("result").textContent = recommendation;
  document.querySelector(".form-step:not(.hidden)").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  updateProgressBar(true); // Progress bar is full on completion
}

// Update progress bar dynamically
function updateProgressBar(isFinalStep = false) {
  const progressPercentage = isFinalStep
    ? 100
    : (currentStepIndex / totalSteps) * 100;

  const progress = document.querySelector(".progress");
  progress.style.width = `${progressPercentage}%`;

  // If the progress reaches 100%, apply the green color
  if (progressPercentage === 100) {
    progress.classList.add("completed");
  }

  const progressBar = document.querySelector(".progress-bar");
  progressBar.setAttribute("aria-valuenow", progressPercentage);
}
