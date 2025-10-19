class Product{
    constructor(name, brand, price, description, image){
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}

let products = [];
products.push(new Product("Tigi Small Talk", "Tigi", "450 грн", "Зміцнювальний крем Tigi Small Talk додає волоссю об’єму, робить його гладким, м’яким і слухняним. Зберігає вологу, підходить для тонкого та ослабленого волосся, має приємний фруктовий аромат.", "static/img/Photos/product1.png"));
products.push(new Product("Hillary Perfect Hair Serenoa", "Hillary", "2500 грн", "Hillary Perfect Hair Serenoa — комплекс для боротьби з випадінням волосся: спортивнює фолікули, знижує DHT, насичує ніацинамідом таproteїнами пшениці, стимулює об’єм і ріст, живить та робить волосся густішим і блискучим.", "static/img/Photos/product2.png"));
products.push(new Product("Чоловічий шампунь Alfaparf Milano", "Alfaparf Milano", "750 грн", "Чоловічий шампунь Alfaparf Milano м’яко очищує волосся і шкіру голови, зміцнює, додає об’єм і свіжість. Підходить для щоденного використання, живить коріння, бореться з жирністю, не містить сульфатів.", "static/img/Photos/product3.png"));
products.push(new Product("Victoria’s Secret Midnight Bloom", "Victoria’s Secret", "400 грн", "Ніжний, солодко-квітковий аромат із вершково-деревним шлейфом. Пахне нічною квіткою, ягодами та теплою амброю. Легкий, мрійливий і чуттєвий — як нічна прогулянка під місяцем.", "static/img/Photos/product4.png"));
products.push(new Product("Romolo Barba Italiana", "Romolo", "940 грн", "Олія з натуральними компонентами: виноградними кісточками, авокадо, арганою, макадамією, бавовною та маслом ладану — зволожує, живить і надає бороді здорового блиску. Вона одночасно захищає, пом’якшує і підкреслює форму бороди та вусів.", "static/img/Photos/product5.png"));

let windowContainer = document.getElementById("windowContainer");
let image = document.getElementById("image");
let title = document.getElementById("name");
let brand = document.getElementById("brand");
let price = document.getElementById("price");
let description = document.getElementById("description");
let mainShade = document.getElementById("mainShade");

function showProduct(id){
    let product = products[id];
    image.src = product.image;
    title.textContent = product.name;
    brand.textContent = product.brand;
    price.textContent = product.price;
    description.textContent = product.description;

    windowContainer.style.opacity = 1;
    windowContainer.style.pointerEvents = "all";
    mainShade.style.opacity = 0.75;
    mainShade.style.pointerEvents = "all";
}

function closeWindow(){
    windowContainer.style.opacity = 0;
    windowContainer.style.pointerEvents = "none";
    mainShade.style.opacity = 0;
    mainShade.style.pointerEvents = "none";
}