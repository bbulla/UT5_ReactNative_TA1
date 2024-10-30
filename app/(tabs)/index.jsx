import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Alert 
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [taskCounter, setTaskCounter] = useState(0); 

  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Por favor, ingresa una tarea válida.');
      return;
    }

    setTasks([...tasks, { id: Date.now().toString(), text: task }]);
    setTask('');
    setTaskCounter(taskCounter + 1); 
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
    setTaskCounter(taskCounter - 1);
  };

  const incrementCounter = () => {
    setTaskCounter(taskCounter + 1);
  };

  const decrementCounter = () => {
    if (taskCounter > 0) {
      setTaskCounter(taskCounter - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>

      {/* Contador de Tareas */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Tareas: {taskCounter}</Text>
        <View style={styles.counterButtons}>
          <TouchableOpacity style={styles.counterButton} onPress={incrementCounter}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.counterButton} onPress={decrementCounter}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Campo de entrada y botón para agregar tareas */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una tarea..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Tareas */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0a9ef9',
  },
  counterButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  counterButton: {
    backgroundColor: '#0a9ef9',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#0a9ef9',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
  },
  deleteText: {
    color: '#f90a6c',
    fontWeight: 'bold',
  },
});
