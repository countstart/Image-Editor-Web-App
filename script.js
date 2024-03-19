let fileinput = document.querySelector('.file-input')
let previewimg = document.querySelector('.image-sec img')
let choosebtn = document.querySelector('#choose-btn')
let filterbtn = document.querySelectorAll('.options button')
let filtername = document.querySelector('.rgn .name')
let filtervalue = document.querySelector('.rgn .value')
let slider = document.querySelector('#slider')
let rotatebtn = document.querySelectorAll('.rf-btn button')
let resetbtn = document.querySelector('.reset-btn')
let savebtn = document.querySelector('#save-btn')

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0 , fliphorizontal = 1, flipvertical = 1

filterbtn.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        document.querySelector('.options .active').classList.remove('active');
        btn.classList.add('active');
        filtername.innerText = btn.innerText;
        
        if(btn.id === 'brightness'){
            slider.max = '100'
            slider.value = brightness;
            filtervalue.innerText = `${brightness}%`
        }
        else if(btn.id === 'saturation'){
            slider.max = '200'
            slider.value = saturation;
            filtervalue.innerText = `${saturation}%`
        }
        else if(btn.id === 'inversion'){
            slider.max = '100'
            slider.value = inversion;
            filtervalue.innerText = `${inversion}%`
        }
        else{
            slider.max = '100'
            slider.value = grayscale
            filtervalue.innerText = `${grayscale}%`
        }

    })
})

let loadimage = ()=>{
    let file = fileinput.files[0]
    if(!file) return
    console.log(file)
    previewimg.src = URL.createObjectURL(file)
    previewimg.addEventListener('load',()=>{
       document.querySelector(".edit-sec").classList.remove("disable")
       document.querySelector(".reset-btn").classList.remove("disable")
       document.querySelector("#save-btn").classList.remove("disable")
       resetfilter()
    })
}

let applyfilter = ()=>{
    previewimg.style.transform = `rotate(${rotate}deg) scale(${fliphorizontal} , ${flipvertical})`
    previewimg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

let updateslider = ()=>{
    filtervalue.innerText = `${slider.value}%`
    const activefilter = document.querySelector('.options .active')
    if(activefilter.id === 'brightness'){
        brightness = slider.value
    }
    else if(activefilter.id === 'saturation'){
        saturation = slider.value
    }
    else if(activefilter.id === 'inversion'){
        inversion = slider.value
    }
    else{
        grayscale = slider.value
    }
    applyfilter()
}

rotatebtn.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        if(btn.id === 'left'){
            rotate -= 90
        }
        else if(btn.id === 'right'){
            rotate += 90
        }
        else if(btn.id === 'horizontal'){
            fliphorizontal = fliphorizontal === 1 ? -1 : 1
        }
        else{
            flipvertical = flipvertical === 1 ? -1 : 1
        }
        applyfilter()
    })
})

let resetfilter = ()=>{
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
    rotate = 0 , fliphorizontal = 1, flipvertical = 1
    filterbtn[0].click()
    applyfilter()
}

let saveimg = ()=> { 
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = previewimg.naturalWidth;
    canvas.height = previewimg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    ctx.scale(fliphorizontal,flipvertical)
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.drawImage(previewimg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
    
    const link = document.createElement('a')
    link.download = 'image.jpg'
    link.href = canvas.toDataURL()
    link.click()
}

fileinput.addEventListener('change',loadimage)
choosebtn.addEventListener('click', () => fileinput.click())
slider.addEventListener('input',updateslider)
resetbtn.addEventListener('click',resetfilter)
savebtn.addEventListener('click',saveimg)