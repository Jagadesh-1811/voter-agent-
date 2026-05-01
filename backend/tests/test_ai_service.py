import unittest
from ai_service import retrieve_faq, get_faq_response

class TestAIService(unittest.TestCase):
    def test_retrieve_faq_success(self):
        """Test that searching for 'register' returns registration info."""
        results = retrieve_faq("how do i register")
        self.assertTrue(len(results) > 0)
        self.assertIn("register", results[0]["question"].lower())

    def test_retrieve_faq_no_match(self):
        """Test that nonsensical queries return empty list."""
        results = retrieve_faq("xyzabc123")
        self.assertEqual(len(results), 0)

    def test_get_faq_response_default(self):
        """Test fallback response for unknown queries."""
        response = get_faq_response("what is the meaning of life")
        self.assertIn("I don't have a specific answer", response)

if __name__ == "__main__":
    unittest.main()
