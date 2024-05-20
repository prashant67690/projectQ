import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';

const Guidelines: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Mid-Term Presentation Guidelines
        </h2>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Date:</h3>
          <p className="mb-4">2nd April to 5th April 2024</p>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Documents Required:</h3>
          <ul className="list-disc ml-6">
            <li>
              Joining Report <em>(Compulsory for all)</em>
            </li>
            <li>
              Synopsis <em>(Compulsory for all)</em>
            </li>
            <li>
              Internship Offer Letter <em>(Only for Outhouse students)</em>
            </li>
            <li>
              Mid-Term Presentation <em>(Compulsory for all)</em>
            </li>
          </ul>
        </div>
        <p className="mb-6">
          <strong>Note:</strong> The Mid Term examination will not be conducted
          until all the above-listed documents are submitted. Failure to provide
          these documents will result in marks deduction.
        </p>

        <h2 className="text-3xl font-bold mb-6 text-center">
          Major Project ETE Slot 1 Presentation Guidelines
        </h2>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Date:</h3>
          <p className="mb-4">20th May 2024</p>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Requirements:</h3>
          <ul className="list-disc ml-6">
            <li>
              2 hardbound copies of the report{' '}
              <em>(Compulsory for submission)</em>
            </li>
            <li>
              Certificate of minimum 4 months duration{' '}
              <em>(Both for inhouse and outhouse students)</em>
            </li>
            <li>
              Appraisal Form from company <em>(Only for Outhouse Students)</em>
            </li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">
            Additional Instructions:
          </h3>
          <ul className="list-disc ml-6">
            <li>Report at Sharp 9:30 AM</li>
            <li>Formal attire is mandatory</li>
            <li>All rooms are in 2AB</li>
            <li>
              After Presentation, students must report to Discussion Room 1, 2AB
              3rd Floor
            </li>
          </ul>
        </div>

        <p>
          Regards,
          <br />
          Dr. Kavita
          <br />
          Major Project Coordinator
        </p>
      </div>
    </DefaultLayout>
  );
};

export default Guidelines;
