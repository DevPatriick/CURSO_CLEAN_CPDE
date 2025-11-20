const gestaoPorProcesso = {
  materia: 'Gestão por Processo',
  grauA: 7,
  grauB: 6
}

const labo = {
  materia: 'Laboratório ||',
  grauA: 3.45,
  grauB: 8
}

const Mate = {
  materia: 'Matemática para Computação',
  grauA: 5.80,
  grauB: 7
}

const Prob = {
  materia: 'Probabilidade e Inferência Estatística',
  grauA: 9.2,
  grauB: 6
}

const Programacao = {
  materia: 'Programação ||',
  grauA: 8,
  grauB: 6
}

const mediaPonderada = (grauA, grauB, materia) => {
  const pesoA = 3
  const pesoB = 7

  const multi = (grauA * pesoA) + (grauB * pesoB) 
  const nota = multi / (pesoA + pesoB)

  if (nota >= 6) {
    console.log(`APROVADO ✔ ${materia}: ${nota.toFixed(2)}`)
  } else {
    console.log(`REPROVADO ❌ ${materia}: ${nota.toFixed(2)}`)
  }

}

mediaPonderada(gestaoPorProcesso.grauA, gestaoPorProcesso.grauB, gestaoPorProcesso.materia)
mediaPonderada(labo.grauA, labo.grauB, labo.materia)
mediaPonderada(Mate.grauA, Mate.grauB, Mate.materia)
mediaPonderada(Prob.grauA, Prob.grauB, Prob.materia)
mediaPonderada(Programacao.grauA, Programacao.grauB, Programacao.materia)