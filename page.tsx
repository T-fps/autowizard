'use client';

import React, { useState } from 'react';
import { Car, Calendar, Users, Wrench, MapPin, ChevronRight, Check, ArrowLeft } from 'lucide-react';

export default function AutoWizard() {
  const [currentPage, setCurrentPage] = useState('home');
  const [testStep, setTestStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [consultForm, setConsultForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', notes: ''
  });

  const questions = [
    {
      id: 'gender',
      question: 'How do you identify?',
      singleChoice: true,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'non-binary', label: 'Non-binary' },
        { value: 'prefer-not', label: 'Prefer not to say' }
      ]
    },
    {
      id: 'zipcode',
      question: 'What is your zip code?',
      type: 'input',
      placeholder: '12345',
      inputType: 'text'
    },
    {
      id: 'age',
      question: 'What is your age range?',
      singleChoice: true,
      options: [
        { value: '18-25', label: '18-25 years old' },
        { value: '26-35', label: '26-35 years old' },
        { value: '36-50', label: '36-50 years old' },
        { value: '51-65', label: '51-65 years old' },
        { value: '65+', label: '65+ years old' }
      ]
    },
    {
      id: 'household',
      question: 'What best describes your household?',
      singleChoice: true,
      options: [
        { value: 'single', label: 'Single, living alone' },
        { value: 'couple', label: 'Couple, no children' },
        { value: 'young-family', label: 'Family with young children (under 12)' },
        { value: 'teen-family', label: 'Family with teenagers' },
        { value: 'empty-nester', label: 'Empty nester / Adult children' },
        { value: 'multi-gen', label: 'Multi-generational household' }
      ]
    },
    {
      id: 'occupation',
      question: 'What is your primary occupation type?',
      singleChoice: true,
      options: [
        { value: 'office-professional', label: 'Office professional / Remote worker' },
        { value: 'trades', label: 'Trades / Construction' },
        { value: 'healthcare', label: 'Healthcare / Emergency services' },
        { value: 'sales', label: 'Sales / Business travel' },
        { value: 'creative', label: 'Creative / Arts' },
        { value: 'retired', label: 'Retired' },
        { value: 'student', label: 'Student' }
      ]
    },
    {
      id: 'daily-commute',
      question: 'What is your typical daily commute?',
      singleChoice: true,
      options: [
        { value: 'none', label: 'No commute / Work from home' },
        { value: 'short', label: 'Short (under 10 miles)' },
        { value: 'moderate', label: 'Moderate (10-30 miles)' },
        { value: 'long', label: 'Long (30-60 miles)' },
        { value: 'very-long', label: 'Very long (60+ miles)' }
      ]
    },
    {
      id: 'weekend-activities',
      question: 'How do you typically spend weekends? (Select all that apply)',
      multipleChoice: true,
      options: [
        { value: 'city-culture', label: 'City activities - restaurants, shopping, culture' },
        { value: 'outdoor-adventure', label: 'Outdoor adventures - hiking, camping, sports' },
        { value: 'family-activities', label: 'Family activities - parks, events, sports' },
        { value: 'home-relaxation', label: 'Relaxing at home' },
        { value: 'road-trips', label: 'Road trips and exploration' }
      ]
    },
    {
      id: 'cargo-needs',
      question: 'What cargo do you typically transport? (Select all that apply)',
      multipleChoice: true,
      options: [
        { value: 'minimal', label: 'Minimal - Just personal items' },
        { value: 'groceries', label: 'Groceries and everyday shopping' },
        { value: 'sports-equipment', label: 'Sports or outdoor equipment' },
        { value: 'work-tools', label: 'Work tools and equipment' },
        { value: 'kids-gear', label: 'Kids gear, strollers, car seats' },
        { value: 'pets', label: 'Pet transportation' },
        { value: 'towing', label: 'Towing trailers or boats' }
      ]
    },
    {
      id: 'passengers',
      question: 'How many passengers do you typically carry?',
      singleChoice: true,
      options: [
        { value: '1-2', label: 'Usually just 1-2 people' },
        { value: '3-4', label: '3-4 people regularly' },
        { value: '5-6', label: '5-6 people regularly' },
        { value: '7+', label: '7 or more people' }
      ]
    },
    {
      id: 'parking',
      question: 'What are your typical parking situations? (Select all that apply)',
      multipleChoice: true,
      options: [
        { value: 'tight-urban', label: 'Tight urban parking, parallel parking' },
        { value: 'garage', label: 'Home garage, covered parking' },
        { value: 'driveway', label: 'Driveway or open parking' },
        { value: 'street', label: 'Street parking' },
        { value: 'lot', label: 'Parking lots' }
      ]
    },
    {
      id: 'weather',
      question: 'What weather conditions do you face regularly? (Select all that apply)',
      multipleChoice: true,
      options: [
        { value: 'mild', label: 'Mild weather year-round' },
        { value: 'hot-dry', label: 'Hot and dry conditions' },
        { value: 'rain', label: 'Frequent rain' },
        { value: 'snow-moderate', label: 'Moderate snow (a few inches)' },
        { value: 'snow-heavy', label: 'Heavy snow and ice' },
        { value: 'all-seasons', label: 'All four seasons with variety' }
      ]
    },
    {
      id: 'terrain',
      question: 'What terrain do you navigate most often? (Select all that apply)',
      multipleChoice: true,
      options: [
        { value: 'city-streets', label: 'City streets and highways' },
        { value: 'suburban-roads', label: 'Suburban paved roads' },
        { value: 'rural-paved', label: 'Rural paved roads' },
        { value: 'gravel-dirt', label: 'Gravel and dirt roads' },
        { value: 'off-road', label: 'Off-road trails' },
        { value: 'mountain', label: 'Mountain roads' }
      ]
    },
    {
      id: 'style-preference',
      question: 'What vehicle styles appeal to you? (Select all that apply)',
      multipleChoice: true,
      options: [
        { value: 'luxury-elegant', label: 'Luxury and elegant' },
        { value: 'sporty-aggressive', label: 'Sporty and aggressive' },
        { value: 'rugged-capable', label: 'Rugged and capable' },
        { value: 'modern-sleek', label: 'Modern and sleek' },
        { value: 'classic-timeless', label: 'Classic and timeless' },
        { value: 'practical-understated', label: 'Practical and understated' }
      ]
    },
    {
      id: 'tech-priority',
      question: 'How important is technology to you?',
      singleChoice: true,
      options: [
        { value: 'essential', label: 'Essential - Want the latest tech and features' },
        { value: 'important', label: 'Important - Appreciate good tech integration' },
        { value: 'moderate', label: 'Moderate - Basic connectivity is enough' },
        { value: 'minimal', label: 'Minimal - Prefer simplicity' }
      ]
    },
    {
      id: 'performance',
      question: 'What performance characteristics matter to you? (Select all that apply)',
      multipleChoice: true,
      options: [
        { value: 'fuel-efficiency', label: 'Fuel efficiency and low running costs' },
        { value: 'acceleration', label: 'Acceleration and power' },
        { value: 'handling', label: 'Handling and driving dynamics' },
        { value: 'comfort', label: 'Ride comfort and quietness' },
        { value: 'capability', label: 'Off-road or towing capability' }
      ]
    },
    {
      id: 'safety-priority',
      question: 'What safety features are most important? (Select all that apply)',
      multipleChoice: true,
      options: [
        { value: 'crash-ratings', label: 'Top crash test ratings' },
        { value: 'driver-assist', label: 'Advanced driver assistance systems' },
        { value: 'visibility', label: 'Good visibility and awareness' },
        { value: 'all-safety', label: 'All safety features equally important' }
      ]
    },
    {
      id: 'interior-priority',
      question: 'What interior features matter most? (Select all that apply)',
      multipleChoice: true,
      options: [
        { value: 'space', label: 'Maximum space and cargo room' },
        { value: 'luxury-materials', label: 'Luxury materials and finishes' },
        { value: 'versatility', label: 'Versatile seating configurations' },
        { value: 'storage', label: 'Clever storage solutions' },
        { value: 'comfort', label: 'Seat comfort and adjustability' }
      ]
    },
    {
      id: 'budget',
      question: 'What is your approximate budget range?',
      singleChoice: true,
      options: [
        { value: 'under-25k', label: 'Under $25,000' },
        { value: '25k-35k', label: '$25,000 - $35,000' },
        { value: '35k-50k', label: '$35,000 - $50,000' },
        { value: '50k-75k', label: '$50,000 - $75,000' },
        { value: 'over-75k', label: 'Over $75,000' }
      ]
    },
    {
      id: 'ownership',
      question: 'Are you considering new or used?',
      singleChoice: true,
      options: [
        { value: 'new-only', label: 'New only - Want latest features and warranty' },
        { value: 'certified-used', label: 'Certified pre-owned - Balance of value and warranty' },
        { value: 'used-recent', label: 'Used (1-3 years old) - Best value' },
        { value: 'used-older', label: 'Used (3+ years old) - Maximum savings' },
        { value: 'open', label: 'Open to either new or used' }
      ]
    },
    {
      id: 'environmental',
      question: 'How important is environmental impact?',
      singleChoice: true,
      options: [
        { value: 'very-important', label: 'Very important - Prefer EV or hybrid' },
        { value: 'somewhat-important', label: 'Somewhat important - Consider fuel efficiency' },
        { value: 'not-priority', label: 'Not a priority - Performance matters more' }
      ]
    },
    {
      id: 'speed-importance',
      question: 'How important is speed and acceleration to you?',
      singleChoice: true,
      options: [
        { value: 'essential', label: 'Essential - I love fast, powerful vehicles' },
        { value: 'important', label: 'Important - Quick acceleration is nice to have' },
        { value: 'moderate', label: 'Moderate - Adequate power is fine' },
        { value: 'not-important', label: 'Not important - Efficiency over speed' }
      ]
    },
    {
      id: 'engine-sound',
      question: 'How do you feel about engine sound?',
      singleChoice: true,
      options: [
        { value: 'love-it', label: 'Love it - A great exhaust note matters to me' },
        { value: 'appreciate', label: 'Appreciate it - Nice but not essential' },
        { value: 'neutral', label: 'Neutral - Don\'t really notice' },
        { value: 'prefer-quiet', label: 'Prefer quiet - Want minimal noise' }
      ]
    },
    {
      id: 'priority-interior-exterior',
      question: 'What matters more to you?',
      singleChoice: true,
      options: [
        { value: 'interior-much-more', label: 'Interior quality - I spend all my time inside' },
        { value: 'interior-somewhat', label: 'Interior slightly more - But appearance matters too' },
        { value: 'equal', label: 'Both equally important' },
        { value: 'exterior-somewhat', label: 'Exterior slightly more - First impressions count' },
        { value: 'exterior-much-more', label: 'Exterior design - I want heads to turn' }
      ]
    },
    {
      id: 'color-preference',
      question: 'What colors appeal to you for your vehicle? (Select all that apply)',
      multipleChoice: true,
      options: [
        { value: 'black', label: 'Black - Classic and sophisticated' },
        { value: 'white', label: 'White - Clean and modern' },
        { value: 'silver-gray', label: 'Silver/Gray - Timeless and practical' },
        { value: 'red', label: 'Red - Bold and energetic' },
        { value: 'blue', label: 'Blue - Refined and distinctive' },
        { value: 'green', label: 'Green - Unique and natural' },
        { value: 'bright-colors', label: 'Bright colors (Yellow, Orange) - Stand out' },
        { value: 'earth-tones', label: 'Earth tones (Brown, Tan, Bronze) - Rugged' },
        { value: 'any', label: 'No preference - Color doesn\'t matter to me' }
      ]
    }
  ];

  const getTerrainFromZip = (zip) => {
    if (!zip || zip.length < 5) return 'suburban';
    const firstDigit = parseInt(zip.charAt(0));
    const firstTwo = parseInt(zip.substring(0, 2));
    
    // Mountain states
    if ([80, 81, 82, 83, 84].includes(firstTwo) || [59, 56, 57].includes(firstTwo)) {
      return 'mountain';
    }
    // Northern snow belt
    if (firstDigit >= 0 && firstDigit <= 5 && ![2, 3].includes(firstDigit)) {
      return 'snow';
    }
    // Southern/Southwest
    if ([7, 8, 9].includes(firstDigit)) {
      return 'hot-dry';
    }
    // Coastal regions
    if ([90, 91, 92, 93, 94, 95, 96, 97, 98, 99].includes(firstTwo) || 
        [30, 31, 32, 33, 34].includes(firstTwo)) {
      return 'coastal';
    }
    return 'moderate';
  };

  const calculateResult = () => {
    const profile = {
      gender: answers.gender,
      zipcode: answers.zipcode,
      terrainZone: getTerrainFromZip(answers.zipcode),
      age: answers.age,
      household: answers.household,
      occupation: answers.occupation,
      dailyCommute: answers['daily-commute'],
      weekendActivities: Array.isArray(answers['weekend-activities']) ? answers['weekend-activities'] : [answers['weekend-activities']],
      cargoNeeds: Array.isArray(answers['cargo-needs']) ? answers['cargo-needs'] : [answers['cargo-needs']],
      passengers: answers.passengers,
      parking: Array.isArray(answers.parking) ? answers.parking : [answers.parking],
      weather: Array.isArray(answers.weather) ? answers.weather : [answers.weather],
      terrain: Array.isArray(answers.terrain) ? answers.terrain : [answers.terrain],
      stylePreference: Array.isArray(answers['style-preference']) ? answers['style-preference'] : [answers['style-preference']],
      techPriority: answers['tech-priority'],
      performance: Array.isArray(answers.performance) ? answers.performance : [answers.performance],
      safetyPriority: Array.isArray(answers['safety-priority']) ? answers['safety-priority'] : [answers['safety-priority']],
      interiorPriority: Array.isArray(answers['interior-priority']) ? answers['interior-priority'] : [answers['interior-priority']],
      budget: answers.budget,
      ownership: answers.ownership,
      environmental: answers.environmental,
      speedImportance: answers['speed-importance'],
      engineSound: answers['engine-sound'],
      interiorExteriorPriority: answers['priority-interior-exterior'],
      colorPreference: Array.isArray(answers['color-preference']) ? answers['color-preference'] : [answers['color-preference']]
    };

    let score = {
      sedan: 0,
      sportSedan: 0,
      suv: 0,
      crossover: 0,
      truck: 0,
      minivan: 0,
      luxury: 0,
      sports: 0,
      electric: 0,
      hybrid: 0,
      offroad: 0,
      compact: 0
    };

    // Household impact
    if (['young-family', 'teen-family'].includes(profile.household)) {
      score.suv += 20;
      score.minivan += 15;
      score.crossover += 15;
    } else if (profile.household === 'multi-gen') {
      score.suv += 25;
      score.minivan += 20;
    } else if (['single', 'couple'].includes(profile.household)) {
      score.sedan += 15;
      score.sportSedan += 10;
      score.compact += 10;
    }

    // Passenger needs
    if (profile.passengers === '7+') {
      score.suv += 25;
      score.minivan += 25;
    } else if (profile.passengers === '5-6') {
      score.suv += 20;
      score.crossover += 15;
    } else if (profile.passengers === '3-4') {
      score.sedan += 10;
      score.crossover += 15;
    } else {
      score.sedan += 15;
      score.sportSedan += 10;
      score.compact += 10;
    }

    // Cargo needs
    if (profile.cargoNeeds.includes('towing')) {
      score.truck += 30;
      score.suv += 20;
    }
    if (profile.cargoNeeds.includes('work-tools') || profile.cargoNeeds.includes('sports-equipment')) {
      score.truck += 15;
      score.suv += 20;
    }
    if (profile.cargoNeeds.includes('kids-gear')) {
      score.suv += 20;
      score.minivan += 20;
      score.crossover += 15;
    }
    if (profile.cargoNeeds.includes('pets')) {
      score.suv += 15;
      score.crossover += 15;
    }

    // Weather and terrain
    const hasSnow = profile.weather.includes('snow-heavy') || profile.weather.includes('snow-moderate') || profile.terrainZone === 'snow';
    if (hasSnow) {
      score.suv += 20;
      score.truck += 15;
      score.crossover += 15;
    }
    
    const hasOffroad = profile.terrain.includes('gravel-dirt') || profile.terrain.includes('off-road') || profile.terrain.includes('mountain') || profile.terrainZone === 'mountain';
    if (hasOffroad) {
      score.offroad += 25;
      score.truck += 20;
      score.suv += 15;
    }
    
    if (profile.terrain.includes('city-streets') && profile.parking.includes('tight-urban')) {
      score.compact += 20;
      score.sedan += 15;
    }

    // Commute
    if (['long', 'very-long'].includes(profile.dailyCommute)) {
      score.sedan += 15;
      score.hybrid += 20;
      score.electric += 15;
    }

    // Weekend activities
    if (profile.weekendActivities.includes('outdoor-adventure')) {
      score.offroad += 20;
      score.suv += 20;
      score.truck += 15;
    }
    if (profile.weekendActivities.includes('road-trips')) {
      score.suv += 15;
      score.crossover += 15;
    }
    if (profile.weekendActivities.includes('city-culture')) {
      score.sedan += 15;
      score.luxury += 10;
    }

    // Style preference
    if (profile.stylePreference.includes('luxury-elegant')) {
      score.luxury += 25;
      score.sedan += 10;
    }
    if (profile.stylePreference.includes('sporty-aggressive')) {
      score.sports += 25;
      score.sportSedan += 20;
    }
    if (profile.stylePreference.includes('rugged-capable')) {
      score.offroad += 25;
      score.truck += 20;
    }
    if (profile.stylePreference.includes('modern-sleek')) {
      score.electric += 15;
      score.sedan += 10;
    }

    // Performance
    if (profile.performance.includes('fuel-efficiency')) {
      score.hybrid += 25;
      score.electric += 20;
      score.compact += 15;
    }
    if (profile.performance.includes('acceleration')) {
      score.sports += 20;
      score.sportSedan += 15;
    }
    if (profile.performance.includes('capability')) {
      score.truck += 20;
      score.offroad += 20;
    }

    // Environmental
    if (profile.environmental === 'very-important') {
      score.electric += 30;
      score.hybrid += 25;
    } else if (profile.environmental === 'somewhat-important') {
      score.hybrid += 15;
    }

    // Speed importance
    if (profile.speedImportance === 'essential') {
      score.sports += 30;
      score.sportSedan += 25;
      score.luxury += 10;
    } else if (profile.speedImportance === 'important') {
      score.sportSedan += 15;
      score.sports += 10;
    } else if (profile.speedImportance === 'not-important') {
      score.hybrid += 10;
      score.electric += 10;
      score.compact += 5;
    }

    // Engine sound
    if (profile.engineSound === 'love-it') {
      score.sports += 25;
      score.sportSedan += 20;
      score.truck += 10;
      score.electric = Math.max(0, score.electric - 15); // Reduce EV score
    } else if (profile.engineSound === 'prefer-quiet') {
      score.electric += 20;
      score.hybrid += 15;
      score.luxury += 10;
    }

    // Interior vs Exterior priority
    if (profile.interiorExteriorPriority === 'interior-much-more') {
      score.luxury += 15;
      score.minivan += 10;
    } else if (profile.interiorExteriorPriority === 'exterior-much-more') {
      score.sports += 20;
      score.luxury += 15;
      score.sportSedan += 10;
    }

    // Budget impact
    if (['under-25k', '25k-35k'].includes(profile.budget)) {
      score.compact += 15;
      score.sedan += 10;
      score.luxury = Math.max(0, score.luxury - 20);
    } else if (profile.budget === 'over-75k') {
      score.luxury += 20;
    }

    // Determine winning categories
    const categories = Object.entries(score).sort((a, b) => b[1] - a[1]);
    const topCategory = categories[0][0];
    const topScore = categories[0][1];

    // Generate recommendation based on top category and profile
    let recommendation = generateRecommendation(topCategory, profile, score);
    setResult(recommendation);
  };

  const generateRecommendation = (category, profile, scores) => {
    const recommendations = {
      suv: {
        category: 'Midsize SUV',
        vehicles: [],
        description: '',
        features: ['Three-row seating options', 'Advanced safety systems', 'Generous cargo space', 'AWD capability'],
        reasoning: []
      },
      crossover: {
        category: 'Compact Crossover',
        vehicles: [],
        description: '',
        features: ['Fuel efficient', 'Easy maneuverability', 'Modern safety tech', 'Versatile cargo'],
        reasoning: []
      },
      sedan: {
        category: 'Midsize Sedan',
        vehicles: [],
        description: '',
        features: ['Excellent fuel economy', 'Comfortable ride', 'Advanced tech', 'Easy parking'],
        reasoning: []
      },
      sportSedan: {
        category: 'Sport Sedan',
        vehicles: [],
        description: '',
        features: ['Powerful engines', 'Sport-tuned handling', 'Premium interiors', 'Advanced tech'],
        reasoning: []
      },
      truck: {
        category: 'Pickup Truck',
        vehicles: [],
        description: '',
        features: ['Maximum towing capacity', 'Bed storage', 'Off-road packages', '4WD capability'],
        reasoning: []
      },
      minivan: {
        category: 'Minivan',
        vehicles: [],
        description: '',
        features: ['Maximum passenger comfort', 'Sliding doors', 'Incredible versatility', 'Family-focused features'],
        reasoning: []
      },
      luxury: {
        category: 'Luxury Vehicle',
        vehicles: [],
        description: '',
        features: ['Premium materials', 'Advanced technology', 'Superior comfort', 'Prestigious brands'],
        reasoning: []
      },
      sports: {
        category: 'Sports Car',
        vehicles: [],
        description: '',
        features: ['Thrilling performance', 'Precise handling', 'Eye-catching design', 'Driver-focused cockpit'],
        reasoning: []
      },
      electric: {
        category: 'Electric Vehicle',
        vehicles: [],
        description: '',
        features: ['Zero emissions', 'Low operating costs', 'Instant torque', 'Cutting-edge tech'],
        reasoning: []
      },
      hybrid: {
        category: 'Hybrid Vehicle',
        vehicles: [],
        description: '',
        features: ['Excellent fuel economy', 'Lower emissions', 'No range anxiety', 'Tax incentives'],
        reasoning: []
      },
      offroad: {
        category: 'Off-Road SUV',
        vehicles: [],
        description: '',
        features: ['Serious 4WD systems', 'High ground clearance', 'Skid plates', 'Trail-rated capability'],
        reasoning: []
      },
      compact: {
        category: 'Compact Car',
        vehicles: [],
        description: '',
        features: ['Outstanding fuel economy', 'Easy to park', 'Affordable pricing', 'Low insurance costs'],
        reasoning: []
      }
    };

    let result = recommendations[category];

    // Customize based on specific profile
    if (category === 'suv') {
      if (profile.household === 'multi-gen' || profile.passengers === '7+') {
        result.vehicles = ['Honda Pilot', 'Toyota Highlander', 'Chevrolet Traverse', 'Mazda CX-90'];
        result.description = 'Your large family needs demand a spacious three-row SUV with room for everyone and their gear.';
        result.reasoning.push('Your household size requires three rows of seating');
      } else if (scores.luxury > 15) {
        result.vehicles = ['BMW X5', 'Mercedes-Benz GLE', 'Audi Q7', 'Volvo XC90'];
        result.description = 'A luxury SUV that combines premium comfort, advanced technology, and the space your lifestyle demands.';
        result.reasoning.push('Your style preferences align with luxury vehicles');
      } else {
        result.vehicles = ['Honda CR-V', 'Toyota RAV4', 'Mazda CX-5', 'Subaru Outback'];
        result.description = 'A versatile SUV that balances practicality, comfort, and value for your active lifestyle.';
      }
      
      if (['snow-heavy', 'snow-moderate'].includes(profile.weather)) {
        result.reasoning.push('AWD capability essential for your weather conditions');
      }
      if (['young-family', 'teen-family'].includes(profile.household)) {
        result.reasoning.push('Family-friendly features and safety ratings prioritized');
      }
    } else if (category === 'crossover') {
      if (profile.budget === 'under-25k') {
        result.vehicles = ['Mazda CX-30', 'Kia Seltos', 'Hyundai Kona', 'Honda HR-V'];
        result.description = 'An affordable compact crossover that delivers great value without compromising on features or quality.';
        result.reasoning.push('Budget-conscious options with strong value');
      } else if (scores.electric > 15) {
        result.vehicles = ['Tesla Model Y', 'Volkswagen ID.4', 'Hyundai Ioniq 5', 'Ford Mustang Mach-E'];
        result.description = 'A modern electric crossover that combines environmental consciousness with practical versatility.';
        result.reasoning.push('Environmental priorities met with electric powertrain');
      } else {
        result.vehicles = ['Mazda CX-5', 'Honda CR-V', 'Toyota RAV4', 'Subaru Forester'];
        result.description = 'The perfect balance of efficiency, practicality, and modern features for everyday life.';
      }
      
      if (profile.parking.includes('tight-urban')) {
        result.reasoning.push('Compact size ideal for urban parking challenges');
      }
      if (['moderate', 'long'].includes(profile.dailyCommute)) {
        result.reasoning.push('Fuel efficiency important for your commute distance');
      }
    } else if (category === 'sedan') {
      if (profile.dailyCommute === 'very-long') {
        result.vehicles = ['Honda Accord Hybrid', 'Toyota Camry Hybrid', 'Hyundai Sonata Hybrid', 'Honda Civic'];
        result.description = 'A fuel-efficient sedan designed to make your long commute comfortable and economical.';
        result.reasoning.push('Hybrid efficiency crucial for extensive daily driving');
      } else if (scores.luxury > 15) {
        result.vehicles = ['BMW 5 Series', 'Mercedes-Benz E-Class', 'Audi A6', 'Genesis G80'];
        result.description = 'A luxury sedan that delivers refined comfort, cutting-edge technology, and prestigious style.';
        result.reasoning.push('Premium experience matches your style preferences');
      } else {
        result.vehicles = ['Honda Accord', 'Toyota Camry', 'Mazda6', 'Hyundai Sonata'];
        result.description = 'A reliable, comfortable sedan that excels in everyday driving with modern features and efficiency.';
      }
      
      if (profile.techPriority === 'essential') {
        result.reasoning.push('Advanced connectivity and driver assistance features');
      }
    } else if (category === 'sportSedan') {
      if (profile.budget === 'over-75k') {
        result.vehicles = ['BMW M3', 'Mercedes-AMG C63', 'Audi RS5', 'Cadillac CT5-V'];
        result.description = 'A high-performance luxury sedan that delivers exhilarating driving dynamics with everyday usability.';
        result.reasoning.push('Performance-focused with luxury refinement');
      } else {
        result.vehicles = ['Volkswagen GTI', 'Honda Civic Si', 'Mazda3 Turbo', 'Subaru WRX'];
        result.description = 'An affordable sport sedan that brings driving excitement without breaking the bank.';
        result.reasoning.push('Sporty driving dynamics at accessible price point');
      }
      
      if (profile.speedImportance === 'essential' || profile.speedImportance === 'important') {
        result.reasoning.push('Quick acceleration and responsive performance');
      }
      result.reasoning.push('Your performance priorities and style preferences');
    } else if (category === 'truck') {
      if (profile.cargoNeeds === 'towing') {
        result.vehicles = ['Ford F-150', 'Chevrolet Silverado 1500', 'Ram 1500', 'Toyota Tundra'];
        result.description = 'A full-size truck with serious towing capability and the versatility to handle any job.';
        result.reasoning.push('Maximum towing capacity for your needs');
      } else if (scores.offroad > 15) {
        result.vehicles = ['Toyota Tacoma TRD Pro', 'Ford Ranger Tremor', 'Chevrolet Colorado ZR2', 'Jeep Gladiator Rubicon'];
        result.description = 'An off-road capable truck that combines adventure-ready features with practical utility.';
        result.reasoning.push('Off-road capability for rugged terrain');
      } else {
        result.vehicles = ['Honda Ridgeline', 'Ford Maverick', 'Toyota Tacoma', 'Chevrolet Colorado'];
        result.description = 'A practical midsize truck that balances capability with everyday drivability and efficiency.';
      }
      
      if (profile.occupation === 'trades') {
        result.reasoning.push('Work-ready features for professional use');
      }
    } else if (category === 'minivan') {
      result.vehicles = ['Honda Odyssey', 'Chrysler Pacifica', 'Toyota Sienna', 'Kia Carnival'];
      result.description = 'The ultimate family hauler with unmatched versatility, comfort, and convenience features.';
      result.reasoning.push('Maximum family versatility and passenger comfort');
      
      if (profile.passengers === '7+' || profile.household === 'multi-gen') {
        result.reasoning.push('Spacious seating for your large household');
      }
      if (profile.cargoNeeds.includes('kids-gear')) {
        result.reasoning.push('Exceptional storage solutions for family equipment');
      }
    } else if (category === 'luxury') {
      if (['single', 'couple'].includes(profile.household)) {
        result.vehicles = ['BMW 7 Series', 'Mercedes-Benz S-Class', 'Audi A8', 'Lexus LS'];
        result.description = 'A flagship luxury sedan offering the pinnacle of comfort, technology, and prestige.';
      } else {
        result.vehicles = ['BMW X7', 'Mercedes-Benz GLS', 'Cadillac Escalade', 'Lincoln Navigator'];
        result.description = 'A luxury SUV that provides first-class comfort for you and your family with commanding presence.';
      }
      
      result.reasoning.push('Premium materials and craftsmanship');
      result.reasoning.push('Cutting-edge technology and features');
      if (profile.interiorExteriorPriority === 'interior-much-more') {
        result.reasoning.push('Exceptional interior quality you prioritize');
      }
      if (profile.interiorExteriorPriority === 'exterior-much-more') {
        result.reasoning.push('Prestigious exterior design and presence');
      }
    } else if (category === 'sports') {
      if (profile.budget === 'over-75k') {
        result.vehicles = ['Porsche 911', 'Chevrolet Corvette', 'BMW M4', 'Audi R8'];
        result.description = 'A high-performance sports car that delivers pure driving exhilaration with exotic appeal.';
      } else {
        result.vehicles = ['Mazda MX-5 Miata', 'Subaru BRZ', 'Toyota GR86', 'Ford Mustang'];
        result.description = 'An engaging sports car that brings driving joy and performance without luxury car pricing.';
      }
      
      result.reasoning.push('Driver-focused dynamics and performance');
      if (profile.speedImportance === 'essential') {
        result.reasoning.push('Speed and acceleration match your priorities');
      }
      if (profile.engineSound === 'love-it') {
        result.reasoning.push('Exciting engine sounds and performance exhaust notes');
      }
      result.reasoning.push('Your sporty style preferences');
    } else if (category === 'electric') {
      if (profile.budget === 'over-75k') {
        result.vehicles = ['Tesla Model S', 'Porsche Taycan', 'BMW i4', 'Mercedes-Benz EQS'];
        result.description = 'A premium electric vehicle that combines zero-emission driving with luxury and performance.';
        result.reasoning.push('High-end EV technology with luxury amenities');
      } else if (scores.suv > 10) {
        result.vehicles = ['Tesla Model Y', 'Ford Mustang Mach-E', 'Hyundai Ioniq 5', 'Volkswagen ID.4'];
        result.description = 'An electric SUV that delivers practicality, space, and environmental benefits.';
        result.reasoning.push('Electric efficiency with SUV versatility');
      } else {
        result.vehicles = ['Tesla Model 3', 'Chevrolet Bolt EV', 'Nissan Leaf', 'Hyundai Ioniq 6'];
        result.description = 'An affordable electric vehicle that makes zero-emission driving accessible and practical.';
      }
      
      result.reasoning.push('Environmental priorities with zero emissions');
      if (['moderate', 'long'].includes(profile.dailyCommute)) {
        result.reasoning.push('Lower operating costs for your commute distance');
      }
      if (profile.engineSound === 'prefer-quiet') {
        result.reasoning.push('Whisper-quiet operation without engine noise');
      }
    } else if (category === 'hybrid') {
      if (scores.suv > 15) {
        result.vehicles = ['Toyota Highlander Hybrid', 'Honda CR-V Hybrid', 'Ford Explorer Hybrid', 'Lexus RX Hybrid'];
        result.description = 'A hybrid SUV that combines family-friendly space with exceptional fuel efficiency.';
        result.reasoning.push('SUV practicality with hybrid efficiency');
      } else if (scores.luxury > 10) {
        result.vehicles = ['Lexus ES Hybrid', 'BMW 530e', 'Mercedes-Benz E-Class Hybrid', 'Audi A6 TFSI e'];
        result.description = 'A luxury hybrid that delivers refined comfort with environmental consciousness.';
      } else {
        result.vehicles = ['Toyota Camry Hybrid', 'Honda Accord Hybrid', 'Hyundai Sonata Hybrid', 'Toyota Prius'];
        result.description = 'A practical hybrid sedan offering outstanding fuel economy without compromise.';
      }
      
      result.reasoning.push('Hybrid technology for fuel savings');
      result.reasoning.push('Environmental consideration without range anxiety');
    } else if (category === 'offroad') {
      result.vehicles = ['Jeep Wrangler', 'Toyota 4Runner', 'Ford Bronco', 'Land Rover Defender'];
      result.description = 'A rugged off-road vehicle built to conquer challenging terrain while providing daily drivability.';
      result.reasoning.push('Serious off-road capability for adventure');
      
      if (profile.terrain.includes('off-road') || profile.weekendActivities.includes('outdoor-adventure')) {
        result.reasoning.push('Matches your outdoor lifestyle and terrain needs');
      }
      if (profile.terrain.includes('mountain') || profile.terrain.includes('gravel-dirt')) {
        result.reasoning.push('Built for the challenging roads you navigate');
      }
    } else if (category === 'compact') {
      result.vehicles = ['Honda Civic', 'Toyota Corolla', 'Mazda3', 'Hyundai Elantra'];
      result.description = 'An efficient compact car that delivers great value, easy maneuverability, and low ownership costs.';
      result.reasoning.push('Outstanding fuel economy and affordability');
      
      if (profile.parking.includes('tight-urban')) {
        result.reasoning.push('Perfect size for urban parking challenges');
      }
      if (['under-25k', '25k-35k'].includes(profile.budget)) {
        result.reasoning.push('Excellent value within your budget');
      }
    }

    // Add general reasoning based on profile
    if (profile.techPriority === 'essential' && !result.reasoning.find(r => r.includes('tech'))) {
      result.reasoning.push('Modern technology features you prioritize');
    }
    
    if (profile.safetyPriority.includes('all-safety') && !result.reasoning.find(r => r.includes('safety'))) {
      result.reasoning.push('Top-tier safety ratings and features');
    }

    // Add color preference note
    if (profile.colorPreference && !profile.colorPreference.includes('any')) {
      const colors = profile.colorPreference
        .filter(c => c !== 'any')
        .map(c => c.replace('-', '/'))
        .join(', ');
      if (colors) {
        result.reasoning.push(`Look for options in your preferred colors: ${colors}`);
      }
    }

    return result;
  };

  const handleAnswer = (questionId, value) => {
    const currentQuestion = questions[testStep];
    
    if (currentQuestion.multipleChoice) {
      // For multiple choice, toggle the selection
      const currentSelections = answers[questionId] || [];
      let newSelections;
      
      if (currentSelections.includes(value)) {
        newSelections = currentSelections.filter(v => v !== value);
      } else {
        newSelections = [...currentSelections, value];
      }
      
      setAnswers({ ...answers, [questionId]: newSelections });
    } else {
      // For single choice, proceed to next question
      setAnswers({ ...answers, [questionId]: value });
      if (testStep < questions.length - 1) {
        setTestStep(testStep + 1);
      } else {
        calculateResult();
      }
    }
  };

  const handleMultipleChoiceContinue = () => {
    const currentQuestion = questions[testStep];
    const currentSelections = answers[currentQuestion.id] || [];
    
    if (currentSelections.length === 0) {
      alert('Please select at least one option');
      return;
    }
    
    if (testStep < questions.length - 1) {
      setTestStep(testStep + 1);
    } else {
      calculateResult();
    }
  };

  const handleInputAnswer = (value) => {
    const currentQuestion = questions[testStep];
    handleAnswer(currentQuestion.id, value);
  };

  const resetTest = () => {
    setTestStep(0);
    setAnswers({});
    setResult(null);
  };

  const handleConsultSubmit = () => {
    if (!consultForm.name || !consultForm.email || !consultForm.phone || !consultForm.date || !consultForm.time) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Thank you! Your consultation request has been submitted. Our team will contact you within 24 hours.');
    setConsultForm({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg">
                <Car className="w-6 h-6 text-slate-900" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                Auto Wizard
              </h1>
            </div>
            <nav className="flex gap-6">
              <button
                onClick={() => { setCurrentPage('test'); resetTest(); }}
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Personality Test
              </button>
              <button
                onClick={() => setCurrentPage('consultation')}
                className="text-slate-300 hover:text-amber-400 transition-colors"
              >
                Expert Consultation
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Home Page */}
      {currentPage === 'home' && (
        <div>
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Find Your Perfect Vehicle Match
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Our comprehensive 24-question personality test analyzes your lifestyle, location, and preferences to recommend the ideal vehicle for you.
            </p>
            <button
              onClick={() => { setCurrentPage('test'); resetTest(); }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-amber-500/25 inline-flex items-center gap-2"
            >
              Start Your Journey <ChevronRight className="w-5 h-5" />
            </button>
          </section>

          {/* Features */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Car,
                  title: 'Advanced Matching',
                  desc: 'Sophisticated algorithm analyzes 20+ factors for precise recommendations'
                },
                {
                  icon: Users,
                  title: 'Expert Consultation',
                  desc: 'Schedule one-on-one sessions with automotive specialists'
                },
                {
                  icon: Wrench,
                  title: 'Aftermarket Support',
                  desc: 'Connect with trusted customization and accessory providers'
                },
                {
                  icon: MapPin,
                  title: 'Dealership Network',
                  desc: 'Direct connections to dealerships, financing, and sales'
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all">
                  <feature.icon className="w-10 h-10 text-amber-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-amber-500/50 transition-all">
                <h3 className="text-xl font-semibold mb-4 text-amber-400">Consultation Services</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>In-depth lifestyle analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Budget and financing guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Feature comparison and recommendations</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-amber-500/50 transition-all">
                <h3 className="text-xl font-semibold mb-4 text-amber-400">Customization Support</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Aftermarket product recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Trusted installer network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Style and functionality planning</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-amber-500/50 transition-all">
                <h3 className="text-xl font-semibold mb-4 text-amber-400">Purchase Assistance</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Dealership connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Financing and loan office referrals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Certified pre-owned options</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Test Page */}
      {currentPage === 'test' && !result && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-slate-400">Question {testStep + 1} of {questions.length}</span>
                <span className="text-sm text-amber-400">{Math.round(((testStep + 1) / questions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((testStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6">{questions[testStep].question}</h2>
            
            {questions[testStep].type === 'input' ? (
              <div className="space-y-4">
                <input
                  type={questions[testStep].inputType || 'text'}
                  placeholder={questions[testStep].placeholder}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors text-lg"
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                      handleInputAnswer((e.target as HTMLInputElement).value);
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                    if (input && input.value && input.value.trim()) {
                      handleInputAnswer(input.value);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all"
                >
                  Continue <ChevronRight className="w-5 h-5 inline ml-2" />
                </button>
              </div>
            ) : questions[testStep].multipleChoice ? (
              <div>
                <div className="space-y-3 mb-6">
                  {questions[testStep].options.map((option, idx) => {
                    const isSelected = (answers[questions[testStep].id] || []).includes(option.value);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(questions[testStep].id, option.value)}
                        className={`w-full text-left p-4 border rounded-lg transition-all group ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500'
                            : 'bg-slate-700/50 border-slate-600 hover:border-amber-500 hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              isSelected ? 'bg-amber-500 border-amber-500' : 'border-slate-500'
                            }`}>
                              {isSelected && <Check className="w-4 h-4 text-slate-900" />}
                            </div>
                            <span className={isSelected ? 'text-amber-400' : 'group-hover:text-amber-400 transition-colors'}>
                              {option.label}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={handleMultipleChoiceContinue}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {questions[testStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(questions[testStep].id, option.value)}
                    className="w-full text-left p-4 bg-slate-700/50 border border-slate-600 rounded-lg hover:border-amber-500 hover:bg-slate-700 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="group-hover:text-amber-400 transition-colors">{option.label}</span>
                      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {testStep > 0 && (
              <button
                onClick={() => setTestStep(testStep - 1)}
                className="mt-6 text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results Page */}
      {currentPage === 'test' && result && (
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Your Perfect Match</h2>
              <p className="text-amber-400 text-xl font-semibold">{result.category}</p>
            </div>

            <p className="text-slate-300 mb-8 text-center max-w-3xl mx-auto text-lg">{result.description}</p>

            {result.reasoning && result.reasoning.length > 0 && (
              <div className="bg-slate-700/30 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-amber-400">Why This Match?</h3>
                <ul className="space-y-2">
                  {result.reasoning.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-700/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-amber-400">Recommended Vehicles</h3>
                <ul className="space-y-2">
                  {result.vehicles.map((vehicle, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      {vehicle}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-amber-400">Key Features</h3>
                <ul className="space-y-2">
                  {result.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3 text-amber-400">Your Profile Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                <div><span className="text-slate-400">Location Zone:</span> {answers.zipcode}</div>
                <div><span className="text-slate-400">Household:</span> {answers.household}</div>
                <div><span className="text-slate-400">Commute:</span> {answers['daily-commute']}</div>
                <div><span className="text-slate-400">Budget:</span> {answers.budget}</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('consultation')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
              >
                Schedule Expert Consultation
              </button>
              <button
                onClick={resetTest}
                className="bg-slate-700 text-slate-200 px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-all"
              >
                Retake Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Page */}
      {currentPage === 'consultation' && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <div className="text-center mb-8">
              <Calendar className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">Schedule Expert Consultation</h2>
              <p className="text-slate-400">Connect with our automotive specialists for personalized guidance</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={consultForm.name}
                    onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                  <input
                    type="email"
                    value={consultForm.email}
                    onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Phone Number</label>
                <input
                  type="tel"
                  value={consultForm.phone}
                  onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Preferred Date</label>
                  <input
                    type="date"
                    value={consultForm.date}
                    onChange={(e) => setConsultForm({ ...consultForm, date: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Preferred Time</label>
                  <select
                    value={consultForm.time}
                    onChange={(e) => setConsultForm({ ...consultForm, time: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="">Select a time</option>
                    <option value="9am">9:00 AM</option>
                    <option value="10am">10:00 AM</option>
                    <option value="11am">11:00 AM</option>
                    <option value="1pm">1:00 PM</option>
                    <option value="2pm">2:00 PM</option>
                    <option value="3pm">3:00 PM</option>
                    <option value="4pm">4:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Additional Notes</label>
                <textarea
                  value={consultForm.notes}
                  onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500 transition-colors h-32 resize-none"
                  placeholder="Tell us about your specific needs, budget, or any questions you have..."
                />
              </div>

              <button
                onClick={handleConsultSubmit}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 px-6 py-4 rounded-lg text-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/80 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg">
                  <Car className="w-5 h-5 text-slate-900" />
                </div>
                <span className="font-bold text-lg">Auto Wizard</span>
              </div>
              <p className="text-slate-400 text-sm">Your trusted partner in finding the perfect vehicle match.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Personality Test</li>
                <li>Expert Consultation</li>
                <li>Dealership Network</li>
                <li>Aftermarket Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Buying Guide</li>
                <li>Financing Options</li>
                <li>Trade-In Values</li>
                <li>Insurance Partners</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>info@autowizard.com</li>
                <li>(555) AUTO-WIZ</li>
                <li>Mon-Sat: 9AM-7PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 text-center text-slate-500 text-sm">
            © 2026 Auto Wizard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}