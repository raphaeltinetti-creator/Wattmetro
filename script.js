//Função Raiz
function calcular(){
    let n1 = document.getElementById('num1').value
    let n2 = document.getElementById('num2').value
    let n3 = document.getElementById('num3').value
    let erro = document.getElementById('erro')
    let resul = document.getElementById('resultado')
    let aviso = document.getElementById('aviso')
    let n4 = document.getElementById('num4').value
    let economia = document.getElementById('economia')

    erro.innerText =   ''
    resul.innerHTML = ''
    aviso.innerText = ''
    economia.innerText = ''

    //Validação Dos Campos
    if(n1 == '' && n2 == '' && n3 ==''){
        erro.innerText = 'ERRO: Campos não preenchidos!'
        console.log('ERROR: NUMBER NOT FOUND!')
        return
    } else if(n1 == '' || n2 == '' || n3 == ''){
        erro.innerText = 'Um campo está vazio!'
        console.log('ERROR: ONE NUMBER NOT FOUND!')
        return
    }
    let num1 = Number(document.getElementById('num1').value)
    let num2 = Number(document.getElementById('num2').value)
    let num3 = Number(document.getElementById('num3').value)
    let band = document.getElementById('band').value

    if(num1 == 0 && num2 == 0 ){
        erro.innerText = 'ERRO: Campos preenchidos com 0!'
        console.log('ERROR: READINGS CANNOT BOTH BE 0!')
        return
    } 
    
    else if (num1 < 0){
        erro.innerText = 'ERRO: Leitura anterior não pode ser menor que 0!'
        console.log('ERROR: THE LAST READING CANNOT BE LOWER THAN 0')
        return
    }

    else if(num2 < num1){
        erro.innerText = 'ERRO: Leitura atual menor que a anterior'
        console.log('ERROR: CURRENT READING IS LOWER THAN THE PREVIOUS ONE')
        return
    } 
    
    else if (num3 <= 0){
        erro.innerText = 'ERRO: Quantidade de dias menor ou igual a 0!'
        console.log('ERROR: NUMBER OF DAYS IS LESS THAN OR EQUAL TO 0!')
        return
    }

    let consumo = num2 - num1 

   let tarifa =  calcularTarifa(consumo)

    let bandeiras = bandeira(consumo , band)

    let taxaIlu = 15
    
    let total = tarifa + bandeiras + taxaIlu


    let media = consumo / num3

    
    resul.innerHTML = `<p>Consumo: ${consumo} kWh</p>
                       <p>Média diária: ${media.toFixed(2)} kWh</p> 
                       <p>Tarifa: R$ ${tarifa.toFixed(2)} </p> 
                       <p>Bandeira: R$ ${bandeiras.toFixed(2)} </p> 
                       <p>Iluminação pública: R$ ${taxaIlu.toFixed(2)} </p> 
                       <p>Total: <strong> R$ ${total.toFixed(2)} </strong></p>  `

   if(consumo > 300){
    aviso.innerText =  'Consumo Alto!'
   } 

   if(n4 != ''){
        let num4 = Number(document.getElementById('num4').value)
        if (total <= num4){
            economia.innerText = 'A sua conta já está dentro do limite !'
        } else if (num4 < taxaIlu){
            economia.innerText = `Impossível a taxa mínima é de R$ ${taxaIlu}`
        } else {

            let consumo_simulado = consumo
            let conta_simulada = total

            while(conta_simulada > num4 && consumo_simulado > 0){
                consumo_simulado = consumo_simulado - 1
                conta_simulada = calcularTarifa(consumo_simulado) + bandeira(consumo_simulado, band) + taxaIlu

            }
            let total_res = consumo - consumo_simulado
            economia.innerText = `O total de kWh a serem economizados é de ${total_res} kWh, a sua conta fica ${conta_simulada.toFixed(2)}`
        }

   } 
}

//Calculo das Tarifas
function calcularTarifa(consumo){
    if (consumo <= 100){
        return consumo * 0.65
   }
   else if(consumo <= 200) {
    return 65  +  (consumo - 100)*0.80

   } else {
    return 65 + 80 + (consumo - 200)*0.95
   }
}
//Calculo das Bandeiras
function bandeira(consumo, bandeiras) {
    let valorBand = 0
    if(bandeiras == 'verde'){
        valorBand = 0
    } else if (bandeiras == 'amarela'){
        valorBand = 1.885
    } else if (bandeiras == 'vermelha1'){
        valorBand = 4.463
    } else if (bandeiras == 'vermelha2'){
        valorBand = 7.877
    }

    return (consumo / 100) * valorBand

}
