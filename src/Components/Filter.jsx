import Autocomplete from './Autocomplete';
import Dropdown from './Dropdown';
import '../Styles/filter.css';
import '../Styles/dropdown.css';

const Filter = () => {
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
    const popularity = ["Most Liked", "Most Commented", "Trending"];
    const status = ["Open for Collaboration", "In Progress", "Completed"];
    const time = ["Newest First", "Oldest First"];

    return (
        <div className="filter-outer">
            <div className="filter-inner">
                <Autocomplete suggestions={ categories } placeholder={ "Categories" }/>
                <Dropdown placeholder={ "Popularity" } suggestions={ popularity }/>
                <Dropdown placeholder={ "Status" } suggestions={ status }/>
                <Dropdown placeholder={ "Time" } suggestions={ time }/>
            </div>
        </div>
    )
}

export default Filter;