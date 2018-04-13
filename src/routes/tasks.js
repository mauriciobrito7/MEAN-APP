/*Aqui irá nuestra API cuando se acceda a esta dirección vamos a devolver datos y cuando se envie un método post nos va a enviar datos y nosotros a almacenar, cuando envie un método put nos va a decir que quiere editar, un delete que quiere eliminar */
const router = require('express').Router();
/*por el nombre sabemos que es una bd local si estuviera alojada en algún dominio colocamos la url*/
const mongojs = require('mongojs');
// Conector
/* Todas las conexiones se llmaran tasks  */
const db = mongojs('mean-db',['tasks']);

// Obtener todas las tareas
router.get('/tasks', (req, res, next) => {
    db.tasks.find((err,tasks)=> {
        // Si ocurre un error que lo envie a un manejador de errores de express
        if( err ) return next(err);
        // Si todo a salido bien responde con el json y con el arreglo de tasks que se ha obtenido de la bd
        res.json(tasks);
    });
});

// Obtener una tarea
/*Para buscar una tarea en el arreglo lo hacemos a traves del id: le pasamos la ruta del id */

router.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne({_id: req.params.id},
    (err, task) => {
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});

// Save a Task
router.post('/tasks', (req, res, next) => {
    var task = req.body;

    if (!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if(err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete a task
router.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},
    (err, task) => {
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});

// Update a task
router.put('/tasks/:id', (req, res, next) => {
    var task = req.body;
    var updatedTask = {};

    if(task.isDone) {
        updatedTask.isDone = task.isDone;
    }
    if(task.title) {
        updatedTask.title = task.title;
    }
    if(!updatedTask) {
        res.status(400);
        res.json({
            error: 'Bad Data'
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},
        updatedTask,
        (err, task) => {
            if(err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;