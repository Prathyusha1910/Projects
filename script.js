const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const taskList = document.getElementById('taskList');
// Initialize Particle.js
// ... (previous JavaScript code) ...

particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            },
        },
        color: {
            value: '#000000' // Replace with black color for the particles
        },
        shape: {
            type: 'star',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: 'img/github.svg',
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#000000",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 9
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// ... (remaining JavaScript code) ...

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <span class="due-date">${formatDueDate(dueDate)}</span>
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        taskList.appendChild(li);

        // Set up the notification for the due date
        setNotification(taskText, dueDate);

        taskInput.value = '';
        dueDateInput.value = '';
    }
}

function completeTask(button) {
    const taskItem = button.parentNode;
    taskItem.classList.toggle('completed');
}

function deleteTask(button) {
    const taskItem = button.parentNode;
    taskList.removeChild(taskItem);
}

function formatDueDate(dueDate) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(dueDate).toLocaleDateString('en-US', options);
    return `Due: ${formattedDate}`;
}


function setNotification(taskText, dueDate) {
    const now = new Date().getTime();
    const dueTime = new Date(dueDate).getTime();

    if (dueTime > now) {
        const timeDifference = dueTime - now;
        setTimeout(() => {
            showNotification(taskText);
        }, timeDifference);
    }
}
function showNotification(taskText) {
    // Check if the browser supports notifications
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            console.log('Notification permission:', permission);
            if (permission === 'granted') {
                const notification = new Notification('Task Reminder', {
                    body: `Don't forget to complete: ${taskText}`,
                });
            }
        });
    } else {
        console.log('Notifications not supported in this browser.');
    }
}



