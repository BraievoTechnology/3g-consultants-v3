import React from 'react'
import { CheckIcon } from 'lucide-react'
interface CategorySelectProps {
    value: string | string[]
    onChange: (value: string | string[]) => void
    multiple?: boolean
}
export const CategorySelect: React.FC<CategorySelectProps> = ({
                                                                  value,
                                                                  onChange,
                                                                  multiple = false,
                                                              }) => {
    const CATEGORIES = [
        'PROCUREMENT_AND_CONTRACTS',
        'HIGHWAYS_AND_TRANSPORTATION_ENGINEERING',
        'WATER_RESOURCES_ENGINEERING',
        'ENVIRONMENTAL_AND_CLIMATE_RESILIENCE_ENGINEERING',
        'URBAN_RURAL_AND_REGIONAL_DEVELOPMENT',
        'COMMERCIAL_AND_HOUSING_DEVELOPMENT',
    ]
    const handleSelection = (category: string) => {
        if (!multiple) {
            onChange(category)
            return
        }
        const currentValue = Array.isArray(value) ? value : []
        if (currentValue.includes(category)) {
            onChange(currentValue.filter((v) => v !== category))
        } else {
            onChange([...currentValue, category])
        }
    }
    const isSelected = (category: string) => {
        if (Array.isArray(value)) {
            return value.includes(category)
        }
        return value === category
    }
    return (
        <div className="rounded-md border border-gray-300 bg-white">
            {CATEGORIES.map((category) => (
                <button
                    key={category}
                    className={`flex w-full items-center justify-between border-b border-gray-200 px-4 py-3 text-left text-sm hover:bg-gray-50 last:border-0 ${isSelected(category) ? 'bg-gray-50' : ''}`}
                    onClick={() => handleSelection(category)}
                >
                    <span className="text-gray-700">{category.replace(/_/g, ' ')}</span>
                    {isSelected(category) && (
                        <CheckIcon className="h-4 w-4 text-[#f1c233]" />
                    )}
                </button>
            ))}
        </div>
    )
}