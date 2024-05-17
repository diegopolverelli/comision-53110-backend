const buscaPedidos=async()=>{
    let divOrdenes=document.getElementById("ordenes")
    let respuesta=await fetch("http://localhost:3000/api/ordenes")
    if(respuesta.ok){
        let datos=await respuesta.json()
        console.log(datos)
        datos.ordenes.forEach(orden=>{
            let numero=document.createElement("p")
            numero.textContent="NUMERO PEDIDO: "+orden.numero
            let cliente=document.createElement("p")
            cliente.textContent="CLIENTE: "+orden.cliente.nombre
            let negocio=document.createElement("p")
            negocio.textContent="BAR: "+orden.negocio.nombre
            let total=document.createElement("p")
            total.textContent="TOTAL A PAGAR: "+orden.total

            let hr=document.createElement("hr")

            divOrdenes.append(numero, cliente, negocio, total, hr)
        })
    }
}