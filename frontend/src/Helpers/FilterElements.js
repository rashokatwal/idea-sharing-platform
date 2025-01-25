const categories = [
    // Technology and Innovation
    "Artificial Intelligence",
    "Blockchain",
    "Renewable Energy",
    "Space Exploration",
    "Robotics",
    "Smart Devices",
    "Software Development",
    
    // Health and Wellness
    "Mental Health",
    "Fitness and Exercise",
    "Nutrition",
    "Medical Technology",
    "Disease Prevention",
    "Healthcare Systems",
    
    // Education and Learning
    "E-Learning Platforms",
    "Classroom Innovations",
    "Language Learning",
    "Skill Development",
    "STEM Education",
    
    // Business and Finance
    "Startups",
    "Investment Strategies",
    "Sustainable Business",
    "Marketing Trends",
    "Freelancing Ideas",
    
    // Social and Environmental Impact
    "Climate Change",
    "Recycling and Waste Management",
    "Renewable Resources",
    "Community Development",
    "Social Justice",
    
    // Art and Design
    "Graphic Design",
    "Animation",
    "Photography",
    "Fashion",
    "Architecture",
    
    // Entertainment and Media
    "Video Games",
    "Film and TV Concepts",
    "Music Production",
    "Social Media Trends",
    "Podcasting",
    
    // Lifestyle and Hobbies
    "Travel and Tourism",
    "DIY Projects",
    "Gardening",
    "Minimalism",
    "Food and Recipes",
    
    // Science and Research
    "Astronomy",
    "Biology",
    "Chemistry",
    "Physics Innovations",
    "Cutting-edge Experiments",
    
    // Others (Miscellaneous)
    "Parenting Tips",
    "Event Planning",
    "Book and Literature Ideas",
    "Cultural Exploration"
];      
const categoryColors = {
    "Artificial Intelligence": "#2F80ED", // Bright blue
    "Blockchain": "#9B51E0", // Purple
    "Renewable Energy": "#27AE60", // Green
    "Space Exploration": "#34495E", // Dark grey-blue
    "Robotics": "#E74C3C", // Red
    "Smart Devices": "#F2994A", // Orange
    "Software Development": "#56CCF2", // Light blue

    "Mental Health": "#FF8C94", // Soft pink
    "Fitness and Exercise": "#6FCF97", // Mint green
    "Nutrition": "#F2C94C", // Yellow
    "Medical Technology": "#BB6BD9", // Lavender
    "Disease Prevention": "#EB5757", // Crimson red
    "Healthcare Systems": "#219653", // Deep green

    "E-Learning Platforms": "#6A67CE", // Medium purple
    "Classroom Innovations": "#F78DA7", // Coral pink
    "Language Learning": "#F4A261", // Soft orange
    "Skill Development": "#2D9CDB", // Sky blue
    "STEM Education": "#BDB2FF", // Lilac

    "Startups": "#D97706", // Amber
    "Investment Strategies": "#028090", // Teal
    "Sustainable Business": "#55A630", // Leaf green
    "Marketing Trends": "#EF476F", // Magenta
    "Freelancing Ideas": "#6D6875", // Neutral mauve

    "Climate Change": "#2B9348", // Forest green
    "Recycling and Waste Management": "#8D99AE", // Grey-blue
    "Renewable Resources": "#43AA8B", // Sea green
    "Community Development": "#FFC857", // Warm yellow
    "Social Justice": "#E63946", // Ruby red

    "Graphic Design": "#C70039", // Scarlet
    "Animation": "#FF5733", // Tangerine
    "Photography": "#FFC300", // Goldenrod
    "Fashion": "#900C3F", // Burgundy
    "Architecture": "#7DCEA0", // Mint

    "Video Games": "#8A56E2", // Electric purple
    "Film and TV Concepts": "#6C757D", // Slate grey
    "Music Production": "#FF6F61", // Coral
    "Social Media Trends": "#1DA1F2", // Twitter blue
    "Podcasting": "#FF9F1C", // Sunset orange

    "Travel and Tourism": "#F4A460", // Sandy brown
    "DIY Projects": "#57B8FF", // Sky blue
    "Gardening": "#83C5BE", // Sage green
    "Minimalism": "#EBEBEB", // Light grey
    "Food and Recipes": "#E07A5F", // Burnt orange

    "Astronomy": "#232946", // Midnight blue
    "Biology": "#A7C957", // Spring green
    "Chemistry": "#FFDD57", // Sunflower yellow
    "Physics Innovations": "#757BC8", // Periwinkle
    "Cutting-edge Experiments": "#4A4E69", // Slate purple

    "Parenting Tips": "#FFB3C1", // Baby pink
    "Event Planning": "#FA7268", // Salmon
    "Book and Literature Ideas": "#9E2A2B", // Crimson
    "Cultural Exploration": "#E09F3E", // Tawny
};

// const popularity = ["Most Liked", "Most Commented", "Trending"];

const status = ["Open for Collaboration", "In Progress", "Completed"];

const timePeriod = ["Today", "Last 7 Days", "Last 30 Days"];

const sortBy = ["Most Liked", "Most Commented", "Trending", "Recently Posted", "Recently Updated"]
  
export { categories, categoryColors, status, timePeriod, sortBy }