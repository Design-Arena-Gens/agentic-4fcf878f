'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Idea {
  title: string
  description: string
  items: string[]
  category: string
  emoji: string
}

const ideas: Idea[] = [
  {
    title: "DIY Kinetic Sculpture",
    description: "Create a spinning art piece using the DVD motor, coin as counterweight, and rope for suspension",
    items: ["rope", "coin", "dvdplayer"],
    category: "Art",
    emoji: "🎨"
  },
  {
    title: "Random Decision Maker",
    description: "Mount coin on DVD motor, use rope to pull mechanism - let physics decide!",
    items: ["rope", "coin", "dvdplayer"],
    category: "Fun",
    emoji: "🎲"
  },
  {
    title: "Laser Show Setup",
    description: "Extract DVD laser diode, create spinning patterns with mirrors mounted on motor",
    items: ["dvdplayer"],
    category: "Tech",
    emoji: "✨"
  },
  {
    title: "Precision Coin Flipper",
    description: "Attach coin to motor for perfectly controlled flips with consistent height",
    items: ["coin", "dvdplayer"],
    category: "Experiment",
    emoji: "🔬"
  },
  {
    title: "Pendulum Clock",
    description: "Use rope and coin to create weighted pendulum, DVD gears for timing mechanism",
    items: ["rope", "coin", "dvdplayer"],
    category: "DIY",
    emoji: "⏰"
  },
  {
    title: "Treasure Hunt Pulley",
    description: "Rope through DVD rollers creates simple pulley system for coin retrieval games",
    items: ["rope", "coin", "dvdplayer"],
    category: "Game",
    emoji: "🏴‍☠️"
  },
  {
    title: "Scrap Metal Components",
    description: "Harvest stepper motors, laser diodes, gears, and springs from DVD player",
    items: ["dvdplayer"],
    category: "Salvage",
    emoji: "🔧"
  },
  {
    title: "Magic Trick Setup",
    description: "Invisible rope tricks with coin disappearing into DVD slot mechanism",
    items: ["rope", "coin", "dvdplayer"],
    category: "Entertainment",
    emoji: "🎩"
  },
  {
    title: "Rube Goldberg Component",
    description: "Coin triggers DVD tray, tray pulls rope, rope triggers next domino",
    items: ["rope", "coin", "dvdplayer"],
    category: "Engineering",
    emoji: "⚙️"
  },
  {
    title: "Plant Watering Timer",
    description: "DVD timer circuit with rope wick system and coin as weight for water reservoir",
    items: ["rope", "coin", "dvdplayer"],
    category: "Garden",
    emoji: "🌱"
  },
  {
    title: "Educational Physics Demo",
    description: "Demonstrate motors, optics, mechanics, leverage, and torque principles",
    items: ["rope", "coin", "dvdplayer"],
    category: "Education",
    emoji: "📚"
  },
  {
    title: "Miniature Elevator",
    description: "DVD motor winds rope around spool, coin provides counterweight",
    items: ["rope", "coin", "dvdplayer"],
    category: "Model",
    emoji: "🏗️"
  }
]

export default function Home() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showAll, setShowAll] = useState(true)

  const items = [
    { id: 'rope', name: 'Rope', emoji: '🪢', color: '#f59e0b' },
    { id: 'coin', name: 'Coin', emoji: '🪙', color: '#eab308' },
    { id: 'dvdplayer', name: 'Broken DVD Player', emoji: '📀', color: '#8b5cf6' }
  ]

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
    setShowAll(false)
  }

  const resetSelection = () => {
    setSelectedItems([])
    setShowAll(true)
  }

  const filteredIdeas = showAll
    ? ideas
    : ideas.filter(idea =>
        selectedItems.every(item => idea.items.includes(item))
      )

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>What Would You Do?</h1>
          <p className={styles.subtitle}>Rope, Coin & Broken DVD Player</p>
        </header>

        <div className={styles.itemSelector}>
          <p className={styles.selectorLabel}>Select items to filter ideas:</p>
          <div className={styles.items}>
            {items.map(item => (
              <button
                key={item.id}
                className={`${styles.itemButton} ${
                  selectedItems.includes(item.id) ? styles.itemActive : ''
                }`}
                onClick={() => toggleItem(item.id)}
                style={{
                  '--item-color': item.color
                } as React.CSSProperties}
              >
                <span className={styles.itemEmoji}>{item.emoji}</span>
                <span className={styles.itemName}>{item.name}</span>
              </button>
            ))}
          </div>
          {!showAll && (
            <button className={styles.resetButton} onClick={resetSelection}>
              Show All Ideas
            </button>
          )}
        </div>

        <div className={styles.ideas}>
          {filteredIdeas.map((idea, index) => (
            <div key={index} className={styles.ideaCard}>
              <div className={styles.ideaHeader}>
                <span className={styles.ideaEmoji}>{idea.emoji}</span>
                <span className={styles.ideaCategory}>{idea.category}</span>
              </div>
              <h3 className={styles.ideaTitle}>{idea.title}</h3>
              <p className={styles.ideaDescription}>{idea.description}</p>
              <div className={styles.ideaItems}>
                {idea.items.map(itemId => {
                  const item = items.find(i => i.id === itemId)
                  return (
                    <span key={itemId} className={styles.ideaItem}>
                      {item?.emoji}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredIdeas.length === 0 && (
          <div className={styles.noResults}>
            <p>No ideas match your selection. Try different items!</p>
          </div>
        )}
      </div>
    </main>
  )
}
