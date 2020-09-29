import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import Atom from './components/Atom/Atom';
import Button from './components/Button/Button';
import {ATOM_TYPES} from './helpers/enums';
import styles from './App.module.scss';

function getRandomAtomType() {
  const types = Object.keys(ATOM_TYPES);
  const index = Math.round(Math.random()); // take only 1 or 0
  return types[index];
}

//generate only ATOM_TYPES.ALIVE - index 0, ATOM_TYPES.DEAD - index 1
function generateAtom(type) {
  return {
    type: type ? type : ATOM_TYPES[getRandomAtomType()],
    key: uuidv4()
  }
}

function App() {
  const [atoms, setAtoms] = useState([]);

  function onAddAtom() {
    let newAtoms = [generateAtom(), ...atoms];
    if (newAtoms.length >= 3) {
      //2 alive - new,
      //3 dead - kill

      const newLife = newAtoms.slice(0, 2).every((atom) => atom.type === ATOM_TYPES.ALIVE);
      const killLife = newAtoms.slice(0, 3).every((atom) => atom.type === ATOM_TYPES.DEAD);

      if (newLife) {
        newAtoms = [generateAtom(ATOM_TYPES.NEW_LIFE_ATOM), ...newAtoms];
      }
      if (killLife) {
        newAtoms = newAtoms.reduce((acc, atom) => {
          if (!acc.killed && atom.type === ATOM_TYPES.NEW_LIFE_ATOM) {
            return {
              killed: true,
              data: acc.data
            };
          }
          return {
            ...acc,
            data: [...acc.data, atom]
          };
        }, {
          killed: false,
          data: []
        }).data;
      }
    }

    setAtoms(newAtoms);
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.title}>
        Клеточное наполнение
      </header>
      {atoms.map(({type, key}) => <Atom type={type} key={key}/>)}
      <footer className={styles.footer}>
        <Button title="Сотворить" onClick={onAddAtom}/>
      </footer>
    </div>
  );
}

export default App;
