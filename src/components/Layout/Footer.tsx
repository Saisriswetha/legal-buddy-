export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">AI Legal Navigator</h3>
            <p className="text-sm text-gray-600">
              Helping international students navigate US legal questions with AI.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-600">Home</a></li>
              <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-600">USCIS</a></li>
              <li><a href="#" className="hover:text-primary-600">Legal Aid</a></li>
              <li><a href="#" className="hover:text-primary-600">Visa Info</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Legal Disclaimer</h4>
            <p className="text-xs text-gray-500">
              This is not legal advice. Consult a licensed attorney for legal matters.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© 2024 AI Legal Navigator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
