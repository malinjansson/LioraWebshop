import { Product, SizeOption } from "../models/Product";



export const standardSizes: SizeOption[] = [
    new SizeOption("30x40", 199.99),
    new SizeOption("50x70", 299.99),
    new SizeOption("70x100", 399.99),
  ];
  
  export const homePageList: Product[] = [
    new Product(1, "Pink Sky Poster", "A stunning sky with soft pink hues at sunset.", "/assets/pink-sky.avif", true, standardSizes),
    new Product(2, "Lighthouse Poster", "A classic lighthouse standing tall against the sea.", "/assets/lighthouse.avif", true, standardSizes),
    new Product(3, "Washington Poster", "A beautiful view of Washington DC, featuring its iconic landmarks.", "/assets/washington.avif", true, standardSizes),
    new Product(4, "Eucalyptus Poster", "A calming poster featuring eucalyptus leaves.", "/assets/eucalyptus.avif", true, standardSizes),
    new Product(5, "Lightbulb Poster", "A minimalist design featuring a glowing lightbulb.", "/assets/lightbulb.avif", true, standardSizes),
    new Product(6, "Sea Poster", "A tranquil sea with clear water under a bright blue sky.", "/assets/road-sea.avif", true, standardSizes),
    new Product(7, "Building Poster", "A modern architectural masterpiece in an urban setting.", "/assets/building.avif", true, standardSizes),
    new Product(8, "Baywatch Poster", "A nostalgic poster inspired by classic Baywatch scenes.", "/assets/baywatch.avif", false, standardSizes),
    new Product(9, "Forest Poster", "A peaceful forest with tall trees and sunlight streaming through.", "/assets/forest.avif", true, standardSizes),
    new Product(10, "City Skyline Poster", "An iconic city skyline under a twilight sky.", "/assets/city.avif", false, standardSizes),
    new Product(11, "Air Balloons Poster", "A beautiful poster featuring air balloons floating in the sky.", "/assets/airballoons.jpg", true, standardSizes),
    new Product(12, "Flowers Poster", "A beautiful bouquet of colorful flowers.", "/assets/flowers.avif", true, standardSizes),
    ]





      