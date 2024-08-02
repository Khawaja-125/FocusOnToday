const checkBox = document.querySelectorAll('.custom-checkbox');
const inputBox = document.querySelectorAll('.goal-input');
const errorBox = document.querySelector('.error-label')
const errors = document.querySelector('.gcount')
const errorShow = document.querySelector('.error');
const progressLabel = document.querySelector('.progress-label')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
  'Congratulations on Completing the ProgressBar!'
]
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let goalsCount = Object.values(allGoals).filter(goal => goal.completed).length;
progressValue.style.width = `${goalsCount / inputBox.length * 100}%`;
progressValue.firstElementChild.innerText = `${goalsCount}/${inputBox.length} completed`;
progressLabel.innerText = allQuotes[goalsCount];

checkBox.forEach(function(check){
  check.addEventListener('click', function(){
    const allGoalsDone = [...inputBox].every(function(input){
      return input.value;
    });
    if(allGoalsDone){
      check.parentElement.classList.toggle('completed');
      const inputId = check.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      goalsCount = Object.values(allGoals).filter(goal => goal.completed).length;
      progressValue.style.width = `${goalsCount / inputBox.length * 100}%`;
      progressValue.firstElementChild.innerText = `${goalsCount}/${inputBox.length} completed`;
      progressLabel.innerText = allQuotes[goalsCount];
      localStorage.setItem('allGoals', JSON.stringify(allGoals));
    } else {
      errors.innerText = `${inputBox.length}`;
      errorShow.classList.add('show-error');
    }
  });
});

inputBox.forEach(input => {
  if(allGoals[input.id]){
    input.value = allGoals[input.id].name;
    if(allGoals[input.id].completed){
      input.parentElement.classList.add('completed');
    }
  }
  input.addEventListener('focus', () => {
    errorShow.classList.remove('show-error');
  });
  input.addEventListener('input', (e) => { 
    if(allGoals[input.id] && allGoals[input.id].completed){
      input.value = allGoals[input.id].name;
      return;
    }
    if(allGoals[input.id]){
      allGoals[input.id].name = input.value;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false
      };
    }
    localStorage.setItem('allGoals', JSON.stringify(allGoals));
  });
});
