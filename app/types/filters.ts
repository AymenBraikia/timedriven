export default interface filters_type {
    brands: {
        "Audemars Piguet": boolean;
        Blancpain: boolean;
        Breitling: boolean;
        Cartier: boolean;
        Chopard: boolean;
        Chronoswiss: boolean;
        Corum: boolean;
        "Frank Muller": boolean;
        "Girard Perregaux": boolean;
        "Glashütte Original": boolean;
        "Grand Seiko": boolean;
        Hublot: boolean;
        IWC: boolean;
        "Jaeger-LeCoultre": boolean;
        Junghans: boolean;
        Nomos: boolean;
        Omega: boolean;
        Panerai: boolean;
        "Patek Philippe": boolean;
        Piaget: boolean;
        Rolex: boolean;
        Sinn: boolean;
        "Tag Heuer": boolean;
        Tudor: boolean;
        "Van Cleef & Arpels": boolean;
    };
    movement: {
        Automatic: boolean;
        Manual: boolean;
        Hybrid: boolean;
    };
    material: {
        "18K rose gold": boolean;
        "18k white gold": boolean;
        "18k yellow gold": boolean;
        Carbon: boolean;
        Ceramic: boolean;
        Plastic: boolean;
        "Rose gold": boolean;
        Roségold: boolean;
        Steel: boolean;
        "Steel/Gold": boolean;
        "Steel/Rose": boolean;
        Titanium: boolean;
        "White gold": boolean;
        "Yellow gold": boolean;
    };
    color: {
        Black: boolean;
        Blue: boolean;
        Brown: boolean;
        Champagne: boolean;
        Champagner: boolean;
        "Chocolate Wave Arabic Dial": boolean;
        "diamond dial": boolean;
        "ghost grey": boolean;
        "Gold & Black": boolean;
        Green: boolean;
        Grey: boolean;
        "Mother of Pearl": boolean;
        Pink: boolean;
        Red: boolean;
        Silver: boolean;
        Skeleton: boolean;
        Tiffany: boolean;
        Violett: boolean;
        White: boolean;
    };
    condition: {
        new: boolean;
        preOwned: boolean;
    };
    caseSize: {
        min: number;
        max: number;
    };
    year: {
        min: number;
        max: number;
    };
    includes: {
        box: boolean;
        papers: boolean;
        patek: boolean;
        servicecard: boolean;
    };
    price: {
        min: number;
        max: number;
    };
}
