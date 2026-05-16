import React from 'react';
import CardTour from './CardTour';
import { formatCurrency } from '../lib/data';
import Link from 'next/link';

export default function SectionDeal({ title, subtitle, toursData = [] }: { title: string, subtitle?: string, toursData?: any[] }) {
  const displayTours = toursData;

  return (
    <section className="container mt-12 mb-12">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase' }}>{title}</h2>
          {subtitle && <p style={{ color: 'var(--text-gray)', marginTop: '8px' }}>{subtitle}</p>}
        </div>
        <Link href="/tours" style={{ display: 'inline-block', textDecoration: 'none', border: '1px solid var(--primary-blue)', padding: '8px 20px', borderRadius: 'var(--radius-full)', fontWeight: 600, color: 'var(--primary-blue)' }}>Xem tất cả</Link>
      </div>
      
      <div className="grid-systems col-4">
        {displayTours.map((tour) => (
          <CardTour 
            key={tour.id} 
            id={tour.id}
            image={tour.image}
            code={tour.code}
            title={tour.title}
            departureDate={tour.departureDate}
            time={tour.time}
            oldPrice={formatCurrency(tour.oldPrice)}
            price={formatCurrency(tour.price)}
            discount={tour.discount}
            seats={tour.seats}
            destination={tour.destination}
            duration={tour.duration}
            departurePoint={tour.departurePoint}
          />
        ))}
      </div>
    </section>
  );
}
